import { core, Integration, Event, utils } from '../shared';
import { MPResource } from '../types//resource';
import { addInstrumentationHandler } from '../instrument';

const { getCurrentHub } = core;
const { uuid4 } = utils;
const hub = getCurrentHub();

export class ResourceErrorIntegration implements Integration {
  /**
    * @inheritDoc
    */
  public static id: string = 'ResourceErrorIntegration';

  /**
   * @inheritDoc
   */
  public name: string = ResourceErrorIntegration.id;

  /**
     * @inheritDoc
     */
  public setupOnce(): void {
    addInstrumentationHandler({
      callback: this._handleDownLoadOnError,
      type: 'resource'
    });
  }

  private _handleDownLoadOnError = (handlerData: any): void => {
    const resourcesVal: MPResource = {
      url: handlerData.url,
      category: 'downloadFile',
      errMsg: handlerData.errMsg,
      eventId: uuid4(),
      statusCode: handlerData.statusCode || '',
      timestamp: Date.now(),
    }
    const payload: Event = {
      resources: [resourcesVal],
      type: 'resource'
    }

    hub.captureEvent({ ...payload });
  }
}
