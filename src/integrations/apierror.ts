import { core, Event, Integration, utils } from '../shared';

import { addInstrumentationHandler } from '../instrument';
import { MPAPI } from 'src/types/api';
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

    // 过滤北斗域名和图片路径
    if (this._filterUrl(handlerData.url, handlerData.method)) return;
    // 处理重复请求
    if (repeatCheck(handlerData.method, handlerData.url)) return;

    const apiVal: MPAPI = {
      category: 'xhr',
      method: isString(handlerData.method) ? handlerData.method.toUpperCase() : 'GET',
      url: this._formatUrl(handlerData.url),
      statusCode: handlerData?.response?.statusCode,
      errMsg: handlerData?.error?.errMsg,
      eventId: uuid4(),
      timestamp: Date.now(),
    };
    const payload: Event = {
      apis: [apiVal],
      type: 'api',
    };

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

  // 过滤url
  private _filterUrl = (url: string, method: string): boolean => {
    if (url.match(/tzjybeidou\.58\.com/) && method === 'POST') {
      // We will not create breadcrumbs for fetch requests that contain `beidou_key` (internal beidou requests)
      return true;
    }

    if (url.match(/\.(png|jpe?g|gif)$/)) {
      return true;
    }

    // todo 本地请求不监听。

    const client = hub.getClient();
    const clientOptions: { [key: string]: any } = client ? client.getOptions() : {};
    let temp = false;

    if (clientOptions.denyUrls) {
      clientOptions.denyUrls.forEach((item: any) => {
        if (url.match(item)) {
          temp = true;
        }
      });
    }

    return temp;
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
