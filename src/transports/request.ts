import { Event, Response, Status, utils } from '../shared';
import MP from '../mp';
import { BaseTransport } from './base';

const { logger, parseRetryAfterHeader } = utils;

export class RequestTransport extends BaseTransport {
  private _disabledUntil: Date = new Date(Date.now());

  public sendEvent(event: Event): PromiseLike<Response> {

    // 429 Too Many Requests 表示在一定的时间内用户发送了太多的请求，即超出了“频次限制”。
    if (new Date(Date.now()) < this._disabledUntil) {
      return Promise.reject({
        event,
        reason: `Transport locked till ${this._disabledUntil} due to too many requests.`,
        status: 429,
      });
    }

    const content: object = this.finalFomartData(event);
    const ctx = MP.instance().getContext();

    this.url = this._getReportUrl(event);

    return this._buffer.add(
      new Promise<Response>((resolve, reject) => {
        ctx.request({
          url: this.url,
          method: 'POST',
          header: {
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
