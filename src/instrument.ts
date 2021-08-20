/** *
 * @file Api重写注入
 */
import { utils } from './shared';
import MP from './mp';

const { logger, getFunctionName, intercept } = utils;

/** Object describing handler that will be triggered for a given `type` of instrumentation */
interface InstrumentHandler {
  type: InstrumentHandlerType;
  callback: InstrumentHandlerCallback;
}
type InstrumentHandlerType = 'request' | 'error' | 'resource';
type InstrumentHandlerCallback = (data: any) => void;

const handlers: { [key in InstrumentHandlerType]?: InstrumentHandlerCallback[] } = {};
const instrumented: { [key in InstrumentHandlerType]?: boolean } = {};

/** Instruments given API */
function instrument(type: InstrumentHandlerType): void {
  const ctx = MP.instance().context;

  if (instrumented[type]) {
    return;
  }

  instrumented[type] = true;

  switch (type) {
    case 'request':
      instrumentRequest(ctx);
      break;
    case 'resource':
      instrumentResource(ctx);
      break;
    case 'error':
      instrumentConsoleError();
      break;
    default:
      logger.warn('unknown instrumentation type:', type);
  }
}

/**
 * Add handler that will be called when given type of instrumentation triggers.
 * Use at your own risk, this might break without changelog notice, only used internally.
 * @hidden
 */
export function addInstrumentationHandler(handler: InstrumentHandler): void {
  if (!handler || typeof handler.type !== 'string' || typeof handler.callback !== 'function') {
    return;
  }

  handlers[handler.type] = handlers[handler.type] || [];
  (handlers[handler.type] as InstrumentHandlerCallback[]).push(handler.callback);
  instrument(handler.type);
}

/** JSDoc */
function triggerHandlers(type: InstrumentHandlerType, data: any): void {
  if (!type || !handlers[type]) {
    return;
  }

  for (const handler of handlers[type] || []) {
    try {
      handler(data);
    } catch (e) {
      logger.error(
        `Error while triggering instrumentation handler.\nType: ${type}\nName: ${getFunctionName(
          handler,
        )}\nError: ${e}`,
      );
    }
  }
}

/** JSDoc */
function instrumentRequest(ctx: object): void {
  intercept(ctx, 'request', (originalRequest: () => void): () => void => function (requestOptions?: any): void {
    const commonHandlerData = {
      ...requestOptions,
      startTimestamp: Date.now(),
    };

    const originSuccess = requestOptions.success;
    const originFail = requestOptions.fail;

    requestOptions.success = (response: any) => {
      if (originSuccess) {
        originSuccess(response);
      }
      triggerHandlers('request', {
        ...commonHandlerData,
        endTimestamp: Date.now(),
        response,
      });
    }

    requestOptions.fail = (error: any) => {
      if (originFail) {
        originFail(error);
      }
      triggerHandlers('request', {
        ...commonHandlerData,
        endTimestamp: Date.now(),
        error,
      });
    }

    return originalRequest.call(ctx, requestOptions);
  });
}


/** JSDoc */
function instrumentConsoleError(): void {
  intercept(window.console, 'error', (originalConsole: any): (...args: any) => void => function (...args: any): boolean {

    triggerHandlers('error', args);

    return originalConsole.call(window.console, args);
  });
}

/** JSDoc */
function instrumentResource(ctx: object): void {
  intercept(ctx, 'downloadFile', (originalDownload: () => void): () => void => function (downloadOptions?: any): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const originSuccess = downloadOptions.success;
    const originFail = downloadOptions.fail;

    downloadOptions.success = (res: any) => {
      if (originSuccess) {
        originSuccess(res);
      }
      if (res.statusCode !== 200) {
        triggerHandlers('resource', {
          statusCode: res.statusCode,
          errMsg: res.errMsg,
          url: downloadOptions.url || ''
        });
      }
    }

    downloadOptions.fail = (error: any) => {
      if (originFail) {
        originFail(error);
      }
      triggerHandlers('resource', {
        errMsg: error.errMsg,
        url: downloadOptions.url || ''
      });
    }

    return originalDownload.call(ctx, downloadOptions);
  });
}