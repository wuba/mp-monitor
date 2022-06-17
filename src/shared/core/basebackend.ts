import { Event, EventHint, Options, Transport } from '../types';
import { logger, BeidouError } from '../utils';

import { NoopTransport } from './transports/noop';

export interface Backend {
  /** Creates a {@link Event} from an exception. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventFromException(exception: any, hint?: EventHint): PromiseLike<Event>;

  /** Creates a {@link Event} from a plain message. */
  eventFromMessage(message: string, hint?: EventHint): PromiseLike<Event>;

  /** Submits the event to Beidou */
  sendEvent(event: Event): void;

  /**
   * Returns the transport that is used by the backend.
   * Please note that the transport gets lazy initialized so it will only be there once the first event has been sent.
   *
   * @returns The transport.
   */
  getTransport(): Transport;
}

/**
 * A class object that can instanciate Backend objects.
 * @hidden
 */
export type BackendClass<B extends Backend, O extends Options> = new (options: O) => B;

/**
 * This is the base implemention of a Backend.
 * @hidden
 */
export abstract class BaseBackend<O extends Options> implements Backend {
  /** Options passed to the SDK. */
  protected readonly _options: O;

  /** Cached transport used internally. */
  protected _transport: Transport;

  /** Creates a new backend instance. */
  public constructor(options: O) {
    this._options = options;
    this._transport = this._setupTransport();
  }

  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  public eventFromException(_exception: any, _hint?: EventHint): PromiseLike<Event> {
    throw new BeidouError('Backend has to implement `eventFromException` method');
  }

  /**
   * @inheritDoc
   */
  public eventFromMessage(_message: string, _hint?: EventHint): PromiseLike<Event> {
    throw new BeidouError('Backend has to implement `eventFromMessage` method');
  }

  /**
   * @inheritDoc
   */
  public sendEvent(event: Event): void {
    this._transport.sendEvent(event).then(null, reason => {
      logger.error(`Error while sending event: ${reason}`);
    });
  }

  /**
   * @inheritDoc
   */
  public getTransport(): Transport {
    return this._transport;
  }

  /**
   * Sets up the transport so it can be used later to send requests.
   */
  protected _setupTransport(): Transport {
    return new NoopTransport();
  }
}