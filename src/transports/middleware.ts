import { reducer, utils, Response } from '../shared';
import { BaseTransport } from './base';
import { RequestTransport } from './request';

const { getCurrentHub } = reducer;
const { SyncPromise } = utils;
const hub = getCurrentHub();
export class MiddlewareTransport extends BaseTransport {
  public sendEvent(event: any): PromiseLike<Response> {
    let { type, request = {} } = event;
    const logType = event.logType || ''
    const { headers = {} } = request;
    const { uuid } = headers;
    if (logType === 'breadcrumb') {
      return this._buffer.add(
        new SyncPromise<Response>((resolve) => {
          let eventCopy: any = { ...event };
          delete eventCopy.projectId;
          delete eventCopy.sdk;
          delete eventCopy.request;
          hub.addBreadcrumb({ ...eventCopy });
          resolve();
        }),
      );
    } else {
      if (type === 'reportBreadcrumb') {
        event.type = 'breadcrumb';
        console.log('行为轨迹上报成功：', uuid)
      }
      return new RequestTransport().sendEvent(event);
    }
  }
}
