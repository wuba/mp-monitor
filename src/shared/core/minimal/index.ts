import { getCurrentHub, Hub, Scope } from '../../hub';
import { Breadcrumb, CaptureContext, Event, Transaction, TransactionContext } from '../../types';
import { isString, truncate,getGlobalObject } from '../../utils';

/**
 * This calls a function on the current hub.
 * @param method function to call on hub.
 * @param args to pass to function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function callOnHub<T>(method: string, ...args: any[]): T {
  const hub = getCurrentHub();
  if (hub && hub[method as keyof Hub]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (hub[method as keyof Hub] as any)(...args);
  }
  throw new Error(`No hub defined or ${method} was not found on the hub, please open a bug report.`);
}

/**
 * Captures an exception event and sends it to Beidou.
 *
 * @param exception An exception-like object.
 * @returns The generated eventId.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function captureException(exception: any, captureContext?: CaptureContext): string {
  let syntheticException: Error;
  try {
    throw new Error('Beidou syntheticException');
  } catch (exception) {
    syntheticException = exception as Error;
  }
  return callOnHub('captureException', exception, {
    captureContext,
    originalException: exception,
    syntheticException,
  });
}

/**
 * Captures a manually created event and sends it to Beidou.
 *
 * @param event The event to send to Beidou.
 * @returns The generated eventId.
 */
export function captureEvent(event: Event): string {
  return callOnHub('captureEvent', event);
}

/**
 * Records a new breadcrumb which will be attached to future events.
 *
 * Breadcrumbs will be added to subsequent events to provide more context on
 * user's actions prior to an error or crash.
 *
 * @param breadcrumb The breadcrumb to record.
 */
export function addBreadcrumb(breadcrumb: Breadcrumb): void {
  callOnHub<void>('addBreadcrumb', breadcrumb);
}

/**
 * Creates a new scope with and executes the given operation within.
 * The scope is automatically removed once the operation
 * finishes or throws.
 *
 * This is essentially a convenience function for:
 *
 *     pushScope();
 *     callback();
 *     popScope();
 *
 * @param callback that will be enclosed into push/popScope.
 */
export function withScope(callback: (scope: Scope) => void): void {
  callOnHub<void>('withScope', callback);
}

/**
 * Calls a function on the latest client. Use this with caution, it's meant as
 * in "internal" helper so we don't need to expose every possible function in
 * the shim. It is not guaranteed that the client actually implements the
 * function.
 *
 * @param method The method to call on the client/client.
 * @param args Arguments to pass to the client/fontend.
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function _callOnClient(method: string, ...args: any[]): void {
  callOnHub<void>('_invokeClient', method, ...args);
}

/**
 * Starts a new `Transaction` and returns it. This is the entry point to manual
 * tracing instrumentation.
 *
 * A tree structure can be built by adding child spans to the transaction, and
 * child spans to other spans. To start a new child span within the transaction
 * or any span, call the respective `.startChild()` method.
 *
 * Every child span must be finished before the transaction is finished,
 * otherwise the unfinished spans are discarded.
 *
 * The transaction must be finished with a call to its `.finish()` method, at
 * which point the transaction with all its finished child spans will be sent to
 * Beidou.
 *
 * @param context Properties of the new `Transaction`.
 */
export function startTransaction(context: TransactionContext): Transaction {
  return callOnHub('startTransaction', { ...context });
}


/** 
 * 上报自定义页面加载完成的指标
 * 
 * 当通用的页面加载完成性能指标不能满足业务需求时，业务可调用该接口上报自定义页面加载完成的指标。
 * 
 * @param metric 自定义指标。只支持 3 个自定义指标 'LOAD0'  'LOAD1'  'LOAD2'
 * @param alias 别名。自定义指标在北斗平台展示的名字
 */
export function pageLoadTrace(metric: 'LOAD0' | 'LOAD1' | 'LOAD2', alias?: string ): void {

  // TODO: 改用节流 Transaction 类
  if(metric.slice(0, 4) !== 'LOAD') return

  const globalObject = getGlobalObject()
  let startTime = Date.now();

  // web
  if (globalObject?.performance?.timeOrigin) {
    startTime = performance.timeOrigin
    // rn
    /* @ts-ignore */
  } else if (globalObject?.__WBAPP__?.buzStart) {
    /* @ts-ignore */
    startTime = globalObject?.__PERFORMANCE__?.in || globalObject.__WBAPP__.buzStart
  }


  callOnHub<void>('captureEvent', {
    performances: [
      {
        contexts:  [{
          description: metric,
          time: Date.now() - startTime,
          extra:encodeURIComponent(JSON.stringify({name: alias})) 
        }],
        spans:[]
      }
    ],
    type: 'performance',
  });
}

/**
 * 添加客户端行为轨迹日志
 * @export
 * @param {Custom} data
 */
export function addCustomBreadcrumb(text: string):void {
  if (!isString(text)) {
    return;
  }
  const content = truncate(text, 500);
  const event: Event = {
    type: 'custom',
    logType: 'breadcrumb',
    customs: [
      {
        text: encodeURIComponent(content),
      },
    ],
  };
  callOnHub<void>('captureEvent', event);
}
