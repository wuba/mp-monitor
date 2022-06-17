import { core, Event, Integration, utils } from '../shared';

import { addInstrumentationHandler } from '../instrument';
import { MPAPI } from '../types/api';
const { uuid4, getGlobalObject, repeatCheck, isString } = utils;
const { getCurrentHub } = core;
const hub = getCurrentHub();
const global = getGlobalObject<Window>();
const overtime = 10000;
/**
 * @hidden
 */

/**
 * Default APIError instrumentations
 * TODO: Deprecated - with v6, this will be renamed to `Instrument`
 */
export class ApiError implements Integration {
  /**
  * @inheritDoc
  */
  public static id: string = 'APIErrorIntegration';

  /**
   * @inheritDoc
   */
  public name: string = ApiError.id;

  /**
   * Create a api of `beidou` from the events themselves
   */
  public setupOnce = (): void => {
    addInstrumentationHandler({
      callback: this._fetchApi,
      type: 'request',
    });
  }

  /**
   * Creates api from XHR API calls
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fetchApi = (handlerData: { [key: string]: any }): void => {
    // 已经请求过了
    if (!handlerData.endTimestamp) return;
    if (!handlerData.response) handlerData.response = { statusCode: -1 };

    // 处理重复请求
    if (repeatCheck(handlerData.method, handlerData.url)) return;

    const apiVal: MPAPI = {
      category: 'xhr',
      method: isString(handlerData.method) ? handlerData.method.toUpperCase() : 'GET',
      url: this._formatUrl(handlerData.url),
      statusCode: handlerData?.response?.statusCode,
      errMsg: encodeURIComponent(JSON.stringify(handlerData?.error?.errMsg)),
      eventId: uuid4(),
      timestamp: Date.now(),
    };
    const payload: Event = {
      apis: [apiVal],
      type: 'api',
    };

    /**
    * 根因分析：如果开启行为轨迹采集 & 高频异常主动上报行为轨迹日志
    */
    // const client: any = getCurrentHub().getClient()
    // const options = client?.getOptions();
    // if (options && options.reportBreadcrumb) {
    //   let status = Status.fromHttpCode(handlerData.response.statusCode);
    //   if (status === Status.Success && handlerData.url.includes('/common')) {
    //     let { result = '' } = handlerData.response.data;
    //     if (result) {
    //       const ctx = MP.instance().context;
    //       ctx.reportBreadcrumb();
    //     }
    //   }
    // }
    // if (handlerData.url.match(/newBehavior/)) {
    //   // @ts-ignore 上报成功清空面包屑 
    //   hub.clearBreadcrumbs();
    // }

    if (handlerData.response.statusCode >= 400) {
      hub.captureEvent({ ...payload });
    } else if (handlerData.response.statusCode === -1) {
      hub.captureEvent({ ...payload });
    }

    this._handleOvertime(handlerData, payload);
  }

  // 处理超时情况
  private _handleOvertime = (handlerData: { [key: string]: any }, payload: Event): void => {
    if (handlerData && handlerData.endTimestamp - handlerData.startTimestamp > overtime) {
      payload!.apis![0].statusCode = 408;
      hub.captureEvent({ ...payload });
    }
  }

  // 补全url
  private _formatUrl = (url: string): string => {
    try {
      const _url = new global.URL(url, global.origin);

      return _url.href;
    } catch (e) {
      return url;
    }
  }
}
