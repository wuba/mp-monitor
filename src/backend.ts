import { eventFromException } from './eventbuilder';
import { core, Event, EventHint, Options, Transport } from './shared';
import { RequestTransport } from './transports';

/**
 * Configuration options for the MiniProgram SDK.
 * @see MiniProgramFrontend for more information.
 */
export interface MiniProgramOptions extends Options {
  /**
   * request url
   */
  url: string;
  /**
   * Enables native crashHandling. This only works if `enableNative` is `true`.
   * Defaults to `true`.
   */
  enableNativeCrashHandling?: boolean;

  /** Maximum time to wait to drain the request queue, before the process is allowed to exit. */
  shutdownTimeout?: number;

  /** Should the native nagger alert be shown or not. */
  enableNativeNagger?: boolean;


  /** The interval to end a session if the App goes to the background. */
  sessionTrackingIntervalMillis?: number;
}

export class MiniProgramBackend extends core.BaseBackend<Options> {
  options: MiniProgramOptions;

  public constructor(protected readonly _options: MiniProgramOptions) {
    super(_options);

    this.options = _options;
  }

  /**
   * @inheritDoc
   */
  public eventFromException(
    exception: unknown,
    hint?: EventHint
  ): PromiseLike<Event> {
    return eventFromException(this.options, exception, hint);
  }

  /**
   * 上报异常不通过 logger.error 输出
   * 小程序拦截了 console.error
   * 避免上报死循环
   * @param event 
   */
  public sendEvent(event: Event): void {
    this._transport.sendEvent(event).then(null, reason => {
      console.warn(`Error while sending event: ${reason}`);
    });
  }

  /**
   * @inheritDoc
   */
  protected _setupTransport(): Transport {
    return new RequestTransport();
  }
}
