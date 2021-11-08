import { core, Event, Response, Transport, utils } from '../shared';

const {
  PromiseBuffer, BeidouError,
} = utils;
const { getCurrentHub } = core;

/** Base Transport class implementation */
export abstract class BaseTransport implements Transport {

  /**
 * @deprecated
 */
  public url: string = '';
  /** A simple buffer holding all requests. */
  protected readonly _buffer: utils.PromiseBuffer<Response> = new PromiseBuffer(30);

  /**
   * @description 返回上报接口链接
   * @returns string
   */
  public _getReportUrl(): string {
    let client = getCurrentHub().getClient() || {
      getOptions() {
        return {
          projectId: '',
          url: ''
        }
      }
    };
    const { url } = client.getOptions();
    return url;
  }

  /**
   * @inheritDoc
   */
  public sendEvent(_: Event): PromiseLike<Response> {
    throw new BeidouError('Transport Class has to implement `sendEvent` method');
  }

  /**
   * @inheritDoc
   */
  public close(timeout?: number): PromiseLike<boolean> {
    return this._buffer.drain(timeout);
  }

  public finalFomartData(event: Event): object {
    const { projectId, exceptions, apis, resources, performances, breadcrumbs, type, sdk, request } = event;
    let content: any = {
      projectId,
      type,
      sdk,
      request,
      ...(performances && { performances }),
      ...(exceptions && { exceptions }),
      ...(apis && { apis }),
      ...(resources && { resources }),
      ...(breadcrumbs && { breadcrumbs }),
    };

    if (
      content.type === 'exception'
      && content.exceptions
      && content.exceptions[0]
      && content.exceptions[0].stacktrace
    ) {
      try {
        content.exceptions[0].stacktrace = JSON.stringify(content.exceptions[0].stacktrace);
      } catch (e) {
        content.exceptions[0].stacktrace = '[]';
      }
    }

    try {
      content = content;
    } catch (e) {
      content = {};
    }

    return content;
  }
}
