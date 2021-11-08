import { addInstrumentationHandler } from '../instrument';
import MP from '../mp';
import { core, Event, Integration } from '../shared';
import { MPException } from '../types/expection';

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

    const mp = MP.instance();

    addInstrumentationHandler({
      callback: (args: any = ['']) => {
        let content = '', stack: any, errType: string = '';
        const ERROR_TYPES_REG = /(((Eval|Reference|Range|Internal|Type|Syntax)Error)|promise)/;

        if (mp.appName === 'swan' && Object.prototype.toString.call(args[0]) === '[object String]') {
          let errDate = args[0].replace(/\n/g, ">>").split('>>');
          content = errDate[1];
          errType = errDate.splice(0, 4).join('').match(ERROR_TYPES_REG)[0];
        } else {
          for (let i = 0; i < 3; i++) {
            if (args[i]) {
              if (Object.prototype.toString.call(args[i]) === '[object Error]') {
                errType = args[i].name;
                content = args[i].message.replace(/\n/g, " ");
                stack = args[i].stack;
                break;
              } else {
                content += args[i].toString();
              }
            }
          }
          if (!errType) {
            let matchType = content.match(ERROR_TYPES_REG);
            if (matchType && matchType.length > 0) {
              errType = matchType[0] === 'promise' ? 'UnhandledRejection' : matchType[0];
            } else {
              errType = 'Error';
            }
          }

        }

        const exceptionVal: MPException = {
          errType,
          content: `${errType}: ${content}`,
          stacktrace: stack || args[0],
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