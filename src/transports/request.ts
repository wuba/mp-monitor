import MP from '../mp';
import { Event, Response, Status, utils, core } from '../shared';
import { BaseTransport } from './base';
import { TCommonInfo } from '../types/mp';

const { logger, parseRetryAfterHeader } = utils;
const { getCurrentHub } = core;

export class RequestTransport extends BaseTransport {
  private _disabledUntil: Date = new Date(Date.now());

  public sendEvent(event: Event): PromiseLike<Response> {

    const client = getCurrentHub().getClient() || {
      getOptions() {
        return {
          projectId: '',
          isDebug: false
        };
      },
    };
    const { isDebug } = client.getOptions();
    const content: TCommonInfo = <TCommonInfo>this.finalFomartData(event);

    if (isDebug && content?.request?.headers?.brand === 'devtools') {
      return Promise.reject({
        event,
        reason: `In the current development environment, exceptions are not reported`,
        status: -1,
      });;
    }

    // 429 Too Many Requests 表示在一定的时间内用户发送了太多的请求，即超出了“频次限制”。
    if (new Date(Date.now()) < this._disabledUntil) {
      return Promise.reject({
        event,
        reason: `Transport locked till ${this._disabledUntil} due to too many requests.`,
        status: 429,
      });
    }

    const ctx = MP.instance().context;

    this.url = this._getReportUrl();

    return this._buffer.add(
      new Promise<Response>((resolve, reject) => {
        ctx.request({
          url: this.url,
          method: 'POST',
          header: {
            'content-type': 'multipart/form-data; boundary=XXX'
          },
          headers: { // 支付宝小程序兼容
            'content-type': 'multipart/form-data; boundary=XXX'
          },
          data: '\r\n--XXX' +
            '\r\nContent-Disposition: form-data; name="content"' +
            '\r\n' +
            '\r\n' + JSON.stringify(content) +
            '\r\n--XXX',
          success: (response: any) => {
            const status = Status.fromHttpCode(response.status);
            if (status === Status.Success) {
              resolve({ status });
              return;
            }
            if (status === Status.RateLimit) {
              const now = Date.now();
              const retryAfterHeader = response.headers.get('Retry-After');

              this._disabledUntil = new Date(now + parseRetryAfterHeader(now, retryAfterHeader));
              logger.warn(`Too many requests, backing off till: ${this._disabledUntil}`);
            }
            reject(response);
          },
          fail: (error: any) => {
            reject(error);
          }
        })
      }),
    );
  }
}
