import { core, utils, Integration, Event, Breadcrumb } from '../shared';
import { addInstrumentationHandler } from '../instrument';
import MP from '../mp';

const { getCurrentHub } = core;
const { logger } = utils;
export interface BeidouWrappedXMLHttpRequest extends XMLHttpRequest {
  [key: string]: any;
  __beidou_xhr__?: {
    method?: string;
    url?: string;
    status_code?: number;
  };
}

interface BreadcrumbsOptions {
  request: boolean;
  error: boolean;
  resource: boolean;
  function: boolean;
}

export class Breadcrumbs implements Integration {
  /**
   * @inheritDoc
   */
  public static id: string = 'Breadcrumbs';

  /**
   * @inheritDoc
   */
  public name: string = Breadcrumbs.id;

  /** JSDoc */
  private readonly _options: BreadcrumbsOptions;

  /**
   * @inheritDoc
   */
  public constructor(options?: Partial<BreadcrumbsOptions>) {
    this._options = {
      request: true,
      error: true,
      resource: true,
      function: false,
      ...options,
    };
  }

  public setupOnce(): void | boolean {
    const client: any = getCurrentHub().getClient()
    const options = client?.getOptions();
    if (options && !options.reportBreadcrumb) {
      return false
    }
    if (this._options.request) {
      addInstrumentationHandler({
        callback: (...args) => {
          this._xhrBreadcrumb(...args);
        },
        type: 'request',
      });
    }

    if (this._options.resource) {
      addInstrumentationHandler({
        callback: (...args) => {
          this._resourceBreadcrumb(...args);
        },
        type: 'resource',
      });
    }

    const reportBreadcrumb = () => {
      try {
        const scope = getCurrentHub().getScope();
        let breadcrumbs: Breadcrumb[] = scope?.getBreadcrumb() || [];
        if (breadcrumbs.length) {
          breadcrumbs = breadcrumbs.map((item: Breadcrumb) => {
            const { type } = item;
            switch (type) {
              case 'api_success':
                item['logKey'] = 'apis';
                break;
              case 'resource_success':
                item['logKey'] = 'resources';
                break;
              default:
                item['logKey'] = `${type}s`;
                break;
            }
            delete item.timestamp;
            return item;
          });
          const event: Event = {
            type: 'reportBreadcrumb',
            breadcrumbs,
          };
          getCurrentHub().captureEvent(event);
        }
      } catch (e) {
        logger.warn('ErrorListener error');
      }
    };
    const ctx = MP.instance().context;

    // 添加全局上报方法
    ctx.reportBreadcrumb = reportBreadcrumb
  }

  private _xhrBreadcrumb(handlerData: { [key: string]: any }): void {
    if (!handlerData.endTimestamp) {
      return;
    }
    // We only capture complete, non-beidou requests
    if (handlerData.__beidou_own_request__) {
      return;
    }
    let { method, url, response, data, startTimestamp, endTimestamp  } = handlerData;
    try {
      let event: any = {
        type: 'api',
        logType: 'breadcrumb',
        apis: [{
          category: 'xhr',
          method,
          url,
          response: response.data,
          statusCode: response.statusCode,
          params: data,
          startTimestamp,
          endTimestamp
        }]
      };
      if (response.statusCode < 400) { //正确的请求
        event.type = 'api_success'
      }
      getCurrentHub().captureEvent(event);
    } catch (e) {
      console.warn('parse error' + e);
    }
  }

  /**
   * Creates breadcrumbs from resource API calls
   */
  private _resourceBreadcrumb(handlerData: { [key: string]: any }): void {
    const event: any = {
      type: 'resource',
      logType: 'breadcrumb',
      resources: [handlerData]
    };
    getCurrentHub().captureEvent(event);
  }
}
