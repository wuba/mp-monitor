/* eslint-disable max-lines */
import { Scope } from '../hub';
import {
    Client, Event, EventHint, EventTypeEnum, Integration, IntegrationClass, Options
} from '../types';
import { isDevHref, isThenable, logger, normalize, SyncPromise, truncate } from '../utils';
import { Backend, BackendClass } from './basebackend';
import { IntegrationIndex, setupIntegrations } from './integration';

const DEFAULT_MAX_COUNT = 25; // 限制当前页面最大上报量
export abstract class BaseClient<B extends Backend, O extends Options> implements Client<O> {
  /**
   * The backend used to physically interact in the environment. Usually, this
   * will correspond to the client. When composing SDKs, however, the Backend
   * from the root SDK will be used.
   */
  protected readonly _backend: B;

  /** Options passed to the SDK. */
  protected readonly _options: O;

  /** Array of used integrations. */
  protected _integrations: IntegrationIndex = {};

  /** Is the client still processing a call? */
  protected _processing: boolean = false;

  private _count: number = DEFAULT_MAX_COUNT
  /**
   * Initializes this client instance.
   *
   * @param backendClass A constructor function to create the backend.
   * @param options Options for the client.
   */
  protected constructor(backendClass: BackendClass<B, O>, options: O) {
    this._backend = new backendClass(options);
    this._options = options;
  }

  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  public captureException(exception: any, hint?: EventHint, scope?: Scope): string | undefined {
    let eventId: string | undefined = hint && hint.event_id;
    this._processing = true;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._getBackend()
      .eventFromException(exception, hint)
      .then(event => {
        event.type = EventTypeEnum.exception;
        eventId = this.captureEvent(event, hint, scope);
      });

    return eventId;
  }

  private _devEnvHandle() {
    if (isDevHref()) {
      logger.warn(`监控你在本地服务进行开发，不会进行北斗上报`);
      return true
      // return false
    }
    return true
  }

  // 上报前策略处理
  private _limitCount(event: Event): boolean {

    // 面包屑没有参与统计
    if (event.type === 'breadcrumb' || event.type === 'performance') {
      return true
    }

    if (this._count <= 0) {
      logger.warn(`当前发送次数已经用完`);
      return false
    }
    logger.log(`当前剩余发送event次数: ${this._count}`)
    this._count = this._count - 1
    return true
  }

  /**
   * @inheritDoc
   */
  public captureEvent(event: Event, hint?: EventHint, scope?: Scope): string | undefined {
    let eventId: string | undefined = hint && hint.event_id;
    this._processing = true;

    this._processEvent(event, hint, scope)
      .then(finalEvent => {
        // We need to check for finalEvent in case beforeSend returned null
        eventId = finalEvent && finalEvent.event_id;
        this._processing = false;
      })
      /* @ts-ignore */
      .then(null, reason => {
        // TODO: 去掉 logger
        // logger.error(reason);
        this._processing = false;
      })

    return eventId;
  }


  /**
   * @inheritDoc
   */
  public getOptions(): O {
    return this._options;
  }


  /**
   * Sets up the integrations
   */
  public setupIntegrations(): void {
    if (this._isEnabled()) {
      this._integrations = setupIntegrations(this._options);
    }
  }

  /**
   * @inheritDoc
   */
  public getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null {
    try {
      return (this._integrations[integration.id] as T) || null;
    } catch (_oO) {
      logger.warn(`Cannot retrieve integration ${integration.id} from the current Client`);
      return null;
    }
  }

  /** Returns the current backend. */
  protected _getBackend(): B {
    return this._backend;
  }

  /** Determines whether this SDK is enabled. */
  protected _isEnabled(): boolean {
    return this.getOptions().enabled !== false;
  }

  /** isProd */
  protected _isProd(): boolean {
    return !!this.getOptions().isProd;
  }

  /** isDebug */
  protected _isDebug(): boolean {
    return !!this.getOptions().isDebug;
  }

  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A new event with more information.
   */
  public _prepareEvent(event: Event, scope?: Scope, hint?: EventHint): PromiseLike<Event | null> {
    const { normalizeDepth = 3 } = this.getOptions();
    const prepared: Event = {
      ...event,
      // event_id: event.event_id || (hint && hint.event_id ? hint.event_id : uuid4()),
      // timestamp: event.timestamp || timestampWithMs(),
    };

    this._applyClientOptions(prepared);
    // this._applyIntegrationsMetadata(prepared);

    // If we have scope given to us, use it as the base for further modifications.
    // This allows us to prevent unnecessary copying of data if `captureContext` is not provided.
    let finalScope = scope;
    if (hint && hint.captureContext) {
      finalScope = Scope.clone(finalScope).update(hint.captureContext);
    }

    // We prepare the result here with a resolved Event.
    let result = SyncPromise.resolve<Event | null>(prepared);

    // This should be the last thing called, since we want that
    // {@link Hub.addEventProcessor} gets the finished prepared event.
    if (finalScope) {
      // In case we have a hub we reassign it.
      result = finalScope.applyToEvent(prepared, hint);
    }

    return result.then(evt => {
      if (typeof normalizeDepth === 'number' && normalizeDepth > 0) {
        return this._normalizeEvent(evt, normalizeDepth);
      }
      return evt;
    });
  }

  /**
   * Applies `normalize` function on necessary `Event` attributes to make them safe for serialization.
   * Normalized keys:
   * - `breadcrumbs.data`
   * - `user`
   * - `contexts`
   * - `extra`
   * @param event Event
   * @returns Normalized event
   */
  protected _normalizeEvent(event: Event | null, depth: number): Event | null {
    if (!event) {
      return null;
    }

    const normalized = {
      ...event,
      ...(event.contexts && {
        contexts: normalize(event.contexts, depth),
      }),
    };
    // event.contexts.trace stores information about a Transaction. Similarly,
    // event.spans[] stores information about child Spans. Given that a
    // Transaction is conceptually a Span, normalization should apply to both
    // Transactions and Spans consistently.
    // For now the decision is to skip normalization of Transactions and Spans,
    // so this block overwrites the normalized event to add back the original
    // Transaction information prior to normalization.
    if (event.contexts && event.contexts.trace) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      normalized.contexts.trace = event.contexts.trace;
    }
    return normalized;
  }

  /**
   *  Enhances event using the client configuration.
   *  It takes care of all "static" values like environment, release and `dist`,
   *  as well as truncating overly long values.
   * @param event event instance to be enhanced
   */
  protected _applyClientOptions(event: Event): void {
    const { maxValueLength = 250 } = this.getOptions();

    const exception = event.exceptions && event.exceptions[0];
    if (exception && exception.content) {
      exception.content = truncate(exception.content, maxValueLength);
    }

    const request = event.request;
    if (request && request.url) {
      request.url = truncate(request.url, maxValueLength);
    }
  }

  /**
   * Tells the backend to send this event
   * @param event The Beidou event to send
   */
  public _sendEvent(event: Event): void {
    // 这里处理拦截 event已经经过了common的处理
    if (this._isProd() && this._devEnvHandle() && this._limitCount(event)) {
      this._getBackend().sendEvent(event);
    }
    if (this._isDebug()) {
      logger.log('1', JSON.stringify(event));
    }
  }

  /**
   * Processes an event (either error or message) and sends it to Beidou.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Beidou.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */
  protected _processEvent(event: Event, hint?: EventHint, scope?: Scope): PromiseLike<Event> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { beforeSend } = this.getOptions();
    if (!this._isEnabled()) {
      return SyncPromise.reject('SDK not enabled, will not send event.');
    }

    return new SyncPromise((resolve, reject) => {
      this._prepareEvent(event, scope, hint)
        .then(prepared => {
          if (prepared === null) {
            reject('An event processor returned null, will not send event.');
            return;
          }
          let finalEvent: Event | null = prepared;
          const isInternalException =
            hint && hint.data && (hint.data as { [key: string]: unknown }).__beidou__ === true;
          // We skip beforeSend in case of transactions
          if (isInternalException || !beforeSend) {
            this._sendEvent(finalEvent);
            resolve(finalEvent);
            return;
          }

          const beforeSendResult = beforeSend(prepared, hint);
          if (typeof beforeSendResult === 'undefined') {
            logger.error('`beforeSend` method has to return `null` or a valid event.');
          } else if (isThenable(beforeSendResult)) {
            this._handleAsyncBeforeSend(beforeSendResult as PromiseLike<Event | null>, resolve, reject);
          } else {
            finalEvent = beforeSendResult as Event | null;

            if (finalEvent === null) {
              logger.log('`beforeSend` returned `null`, will not send event.');
              resolve(null);
              return;
            }

            // From here on we are really async
            this._sendEvent(finalEvent);
            resolve(finalEvent);
          }
        })
        .then(null, reason => {
          this.captureException(reason, {
            data: {
              __beidou__: true,
            },
            originalException: reason as Error,
          });
          reject(
            `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${reason}`,
          );
        });
    });
  }

  /**
   * Resolves before send Promise and calls resolve/reject on parent SyncPromise.
   */
  private _handleAsyncBeforeSend(
    beforeSend: PromiseLike<Event | null>,
    resolve: (event: Event) => void,
    reject: (reason: string) => void,
  ): void {
    beforeSend
      .then(processedEvent => {
        if (processedEvent === null) {
          reject('`beforeSend` returned `null`, will not send event.');
          return;
        }
        // From here on we are really async
        this._sendEvent(processedEvent);
        resolve(processedEvent);
      })
      .then(null, e => {
        reject(`beforeSend rejected with ${e}`);
      });
  }
}
