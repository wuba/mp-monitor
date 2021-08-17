import { core, Event, Integration } from '../shared';
import { MPException } from '../types/expection';
import { addInstrumentationHandler } from '../instrument';

const { getCurrentHub } = core;
const hub = getCurrentHub();

export class GlobalHandlers implements Integration {
  /**
   * @inheritDoc
   */
  public static id: string = 'GlobalHandlersIntegration';

  /**
   * @inheritDoc
   */
  public name: string = GlobalHandlers.id;

  /** JSDoc */
  private _onErrorHandlerInstalled: boolean = false;
  /**
   * @inheritDoc
   */
  public setupOnce(): void {
    this._installGlobalOnErrorHandler();
  }

  private _installGlobalOnErrorHandler(): void {
    if (this._onErrorHandlerInstalled) {
      return;
    }
    addInstrumentationHandler({
      callback: (args: any = ['']) => {
        let { name = 'jsexec', message = '', stack } = args[0];
        const exceptionVal: MPException = {
          content: `${name}: ${message}`,
          stacktrace: stack,
        }
        const payload: Event = {
          exceptions: [exceptionVal],
          type: 'exception'
        }

        hub.captureEvent({ ...payload });
      },
      type: 'error'
    });

    this._onErrorHandlerInstalled = true;
  }
}