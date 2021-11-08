/* eslint-disable max-lines */
import {
    Breadcrumb, CaptureContext, Event, EventHint, EventProcessor, Scope as ScopeInterface,
    ScopeContext, Span, Transaction
} from '../types';
import { getGlobalObject, isPlainObject, isThenable, SyncPromise, timestampWithMs } from '../utils';

/**
 * Holds additional event information. {@link Scope.applyToEvent} will be
 * called by the client before an event will be sent.
 */
export class Scope implements ScopeInterface {
  /** Flag if notifiying is happening. */
  protected _notifyingListeners: boolean = false;

  /** Callback for client to receive scope changes. */
  protected _scopeListeners: Array<(scope: Scope) => void> = [];

  /** Callback list that will be called after {@link applyToEvent}. */
  protected _eventProcessors: EventProcessor[] = [];

  /** Array of breadcrumbs. */
  protected _breadcrumbs: Breadcrumb[] = [];

  /** Extra */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _extra: { [key: string]: any } = {};

  /** Contexts */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _contexts: { [key: string]: any } = {};

  /** Transaction Name */
  protected _transactionName?: string;

  /** Span */
  protected _span?: Span;

  /**
   * Inherit values from the parent scope.
   * @param scope to clone.
   */
  public static clone(scope?: Scope): Scope {
    const newScope = new Scope();
    if (scope) {
      newScope._breadcrumbs = [...scope._breadcrumbs];
      newScope._extra = { ...scope._extra };
      newScope._contexts = { ...scope._contexts };
      newScope._span = scope._span;
      newScope._transactionName = scope._transactionName;
      newScope._eventProcessors = [...scope._eventProcessors];
    }
    return newScope;
  }

  /**
   * Add internal on change listener. Used for sub SDKs that need to store the scope.
   * @hidden
   */
  public addScopeListener(callback: (scope: Scope) => void): void {
    this._scopeListeners.push(callback);
  }

  /**
   * @inheritDoc
   */
  public addEventProcessor(callback: EventProcessor): this {
    this._eventProcessors.push(callback);
    return this;
  }


  /**
   * @inheritDoc
   */
  public setTransactionName(name?: string): this {
    this._transactionName = name;
    this._notifyScopeListeners();
    return this;
  }

  /**
   * Can be removed in major version.
   * @deprecated in favor of {@link this.setTransactionName}
   */
  public setTransaction(name?: string): this {
    return this.setTransactionName(name);
  }

  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setContext(key: string, context: { [key: string]: any } | null): this {
    this._contexts = { ...this._contexts, [key]: context };
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
  public setSpan(span?: Span): this {
    this._span = span;
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
  public getSpan(): Span | undefined {
    return this._span;
  }

  /**
   * @inheritDoc
   */
  public getTransaction(): Transaction | undefined {
    const span = this.getSpan() as Span & { spanRecorder: { spans: Span[] } };
    if (span && span.spanRecorder && span.spanRecorder.spans[0]) {
      return span.spanRecorder.spans[0] as Transaction;
    }
    return undefined;
  }

  /**
   * @inheritDoc
   */
  public getBreadcrumb(): Breadcrumb[] {
    return this._breadcrumbs;
  }

  /**
   * @inheritDoc
   */
  public update(captureContext?: CaptureContext): this {
    if (!captureContext) {
      return this;
    }

    if (typeof captureContext === 'function') {
      const updatedScope = (captureContext as <T>(scope: T) => T)(this);
      return updatedScope instanceof Scope ? updatedScope : this;
    }

    if (captureContext instanceof Scope) {
      this._extra = { ...this._extra, ...captureContext._extra };
      this._contexts = { ...this._contexts, ...captureContext._contexts };
    } else if (isPlainObject(captureContext)) {
      // eslint-disable-next-line no-param-reassign
      captureContext = captureContext as ScopeContext;
      this._extra = { ...this._extra, ...captureContext.extra };
      this._contexts = { ...this._contexts, ...captureContext.contexts };
    }

    return this;
  }

  /**
   * @inheritDoc
   */
  public clear(): this {
    this._breadcrumbs = [];
    this._extra = {};
    this._contexts = {};
    this._transactionName = undefined;
    this._span = undefined;
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
  public addBreadcrumb(breadcrumb: Breadcrumb, maxBreadcrumbs?: number): this {
    const mergedBreadcrumb = {
      timestamp: timestampWithMs(),
      ...breadcrumb,
    };

    this._breadcrumbs =
      maxBreadcrumbs !== undefined && maxBreadcrumbs >= 0
        ? [...this._breadcrumbs, mergedBreadcrumb].slice(-maxBreadcrumbs)
        : [...this._breadcrumbs, mergedBreadcrumb];
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
  public clearBreadcrumbs(): this {
    this._breadcrumbs = [];
    this._notifyScopeListeners();
    return this;
  }

  /**
   * Applies the current context and fingerprint to the event.
   * Note that breadcrumbs will be added by the client.
   * Also if the event has already breadcrumbs on it, we do not merge them.
   * @param event Event
   * @param hint May contain additional informartion about the original exception.
   * @hidden
   */
  public applyToEvent(event: Event, hint?: EventHint): PromiseLike<Event | null> {
    if (this._contexts && Object.keys(this._contexts).length) {
      event.contexts = { ...this._contexts, ...event.contexts };
    }
    // We want to set the trace context for normal events only if there isn't already
    // a trace context on the event. There is a product feature in place where we link
    // errors with transaction and it relys on that.
    // if (this._span && event.type === 'performance') {
    //   event.contexts = { trace: this._span.getTraceContext(), ...event.contexts };
    // }

    // event.breadcrumbs = [...(event.breadcrumbs || []), ...this._breadcrumbs];
    // event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : undefined;

    return this._notifyEventProcessors([...getGlobalEventProcessors(), ...this._eventProcessors], event, hint);
  }

  /**
   * This will be called after {@link applyToEvent} is finished.
   */
  protected _notifyEventProcessors(
    processors: EventProcessor[],
    event: Event | null,
    hint?: EventHint,
    index: number = 0,
  ): PromiseLike<Event | null> {
    return new SyncPromise<Event | null>((resolve, reject) => {
      const processor = processors[index];
      if (event === null || typeof processor !== 'function') {
        resolve(event);
      } else {
        const result = processor({ ...event }, hint) as Event | null;
        if (isThenable(result)) {
          (result as PromiseLike<Event | null>)
            .then(final => this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve))
            .then(null, reject);
        } else {
          this._notifyEventProcessors(processors, result, hint, index + 1)
            .then(resolve)
            .then(null, reject);
        }
      }
    });
  }

  /**
   * This will be called on every set call.
   */
  protected _notifyScopeListeners(): void {
    if (!this._notifyingListeners) {
      this._notifyingListeners = true;
      setTimeout(() => {
        this._scopeListeners.forEach(callback => {
          callback(this);
        });
        this._notifyingListeners = false;
      });
    }
  }
}

/**
 * Retruns the global event processors.
 */
function getGlobalEventProcessors(): EventProcessor[] {
  const global = getGlobalObject<Window>();
  global.__BEIDOU__ = global.__BEIDOU__ || {};
  global.__BEIDOU__.globalEventProcessors = global.__BEIDOU__.globalEventProcessors || [];
  return global.__BEIDOU__.globalEventProcessors;
}

/**
 * Add a EventProcessor to be kept globally.
 * @param callback EventProcessor to add
 */
export function addGlobalEventProcessor(callback: EventProcessor): void {
  getGlobalEventProcessors().push(callback);
}
