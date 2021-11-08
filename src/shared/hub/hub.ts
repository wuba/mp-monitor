/* eslint-disable max-lines */
import {
    Breadcrumb, BreadcrumbHint, Client, Event, EventHint, Hub as HubInterface, Integration,
    IntegrationClass, Span, SpanContext, Transaction, TransactionContext
} from '../types';
import { consoleSandbox, getGlobalObject, logger, timestampWithMs, uuid4 } from '../utils';
import { Carrier, Layer } from './interfaces';
import { Scope } from './scope';

/**
 * 默认添加event最大长度的面包屑。能被覆盖
 * with {@link Options.maxBreadcrumbs}.
 */
const DEFAULT_BREADCRUMBS = 100;

/**
 * 最大的面包屑长度
 */
const MAX_BREADCRUMBS = 100;

/**
 * @inheritDoc
 */
export class Hub implements HubInterface {
  /** 包含client和scope的实例的堆栈 */
  private readonly _stack: Layer[] = [];

  /** 最后上报event的uuid4 */
  private _lastEventId?: string;

  /**
   * 创建hub的实例，把scope和client实例绑定到_stack上
   *
   * @param client bound to the hub.
   * @param scope bound to the hub.
   */
  public constructor(client?: Client, scope: Scope = new Scope()) {
    this._stack.push({ client, scope });
    this.bindClient(client);
  }

  /**
   * 绑定client到_stack
   */
  public bindClient(client?: Client): void {
    const top = this.getStackTop();
    top.client = client;

    // 集成的调用处理
    if (client && client.setupIntegrations) {
      client.setupIntegrations();
    }
  }

  /**
   * scope入栈
   */
  public pushScope(): Scope {
    const stack = this.getStack();
    const parentScope = stack.length > 0 ? stack[stack.length - 1].scope : undefined;
    const scope = Scope.clone(parentScope);
    this.getStack().push({
      client: this.getClient(),
      scope,
    });
    return scope;
  }

  /**
   * scope出栈
   */
  public popScope(): boolean {
    return this.getStack().pop() !== undefined;
  }

  /**
   * 接受scope匿名回调,复制scope不会改变挂载在全局的scope实例
   */
  public withScope(callback: (scope: Scope) => void): void {
    const scope = this.pushScope();
    try {
      callback(scope);
    } finally {
      this.popScope();
    }
  }

  /** 返回顶层的client实例 */
  public getClient<C extends Client>(): C | undefined {
    return this.getStackTop().client as C;
  }

  /** 返回顶层的scope实例 */
  public getScope(): Scope | undefined {
    return this.getStackTop().scope;
  }

  /** 返回_stack  */
  public getStack(): Layer[] {
    return this._stack;
  }

  /** 返回堆栈最后的stack */
  public getStackTop(): Layer {
    return this._stack[this._stack.length - 1];
  }

  /**
   * captureException上报
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  public captureException(exception: any, hint?: EventHint): string {
    const eventId = (this._lastEventId = uuid4());
    let finalHint = hint;
    if (!hint) {
      let syntheticException: Error;
      try {
        throw new Error('Beidou syntheticException');
      } catch (exception) {
        syntheticException = exception as Error;
      }
      finalHint = {
        originalException: exception,
        syntheticException,
      };
    }

    this._invokeClient('captureException', exception, {
      timestamp: Date.now(),
      event_id: eventId,
      ...finalHint,
    });
    return eventId;
  }

  /**
   * 一次event上报
   */
  public captureEvent(event: Event, hint?: EventHint): string {
    const eventId = (this._lastEventId = uuid4());
    this._invokeClient('captureEvent', event, {
      timestamp: Date.now(),
      event_id: eventId,
      ...hint,
    });
    return eventId;
  }

  /**
   * 获取eventId
   */
  public lastEventId(): string | undefined {
    return this._lastEventId;
  }

  /**
   * @inheritDoc
   * 添加面包屑
   */
  public addBreadcrumb(breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void {
    const top = this.getStackTop();

    if (!top.scope || !top.client) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } =
      (top.client.getOptions && top.client.getOptions()) || {};

    if (maxBreadcrumbs <= 0) {
      return;
    }

    const timestamp = timestampWithMs();
    const mergedBreadcrumb = { timestamp, ...breadcrumb };
    const finalBreadcrumb = beforeBreadcrumb
      ? (consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint)) as Breadcrumb | null)
      : mergedBreadcrumb;

    if (finalBreadcrumb === null) {
      return;
    }

    top.scope.addBreadcrumb(finalBreadcrumb, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setContext(name: string, context: { [key: string]: any } | null): void {
    const top = this.getStackTop();
    if (!top.scope) {
      return;
    }
    top.scope.setContext(name, context);
  }

  /**
   * 接受scope的处理回调， 接受scope匿名回调, 会改变挂载在全局的scope实例
   */
  public configureScope(callback: (scope: Scope) => void): void {
    const top = this.getStackTop();
    if (top.scope && top.client) {
      callback(top.scope);
    }
  }

  /**
   * 判断integration是否在初始化被注入
   */
  public getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null {
    const client = this.getClient();
    if (!client) {
      return null;
    }
    try {
      return client.getIntegration(integration);
    } catch (_oO) {
      logger.warn(`Cannot retrieve integration ${integration.id} from the current Hub`);
      return null;
    }
  }

  /**
   * 性能处理, 待确认
   */
  public startSpan(context: SpanContext): Span {
    return this._callExtensionMethod('startSpan', context);
  }

  /**
   * 性能处理, 待确认
   */
  public startTransaction(context: TransactionContext): Transaction {
    return this._callExtensionMethod('startTransaction', context);
  }

  /**
   * clint method具体实现
   *
   * @param method The method to call on the client.
   * @param args Arguments to pass to the client function.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _invokeClient<M extends keyof Client>(method: M, ...args: any[]): void {
    const top = this.getStackTop();
    if (top && top.client && top.client[method]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (top.client as any)[method](...args, top.scope);
    }
  }

  /**
   * 全局global extension方法调用
   */
  // @ts-ignore Function lacks ending return statement and return type does not include 'undefined'. ts(2366)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _callExtensionMethod<T>(method: string, ...args: any[]): T {
    const carrier = getMainCarrier();
    const beidou = carrier.__BEIDOU__;
    if (beidou && beidou.extensions && typeof beidou.extensions[method] === 'function') {
      return beidou.extensions[method].apply(this, args);
    }
    logger.warn(`Extension method ${method} couldn't be found, doing nothing.`);
  }
}

/** 返回挂载全局的垫片属性. */
export function getMainCarrier(): Carrier {
  const carrier = getGlobalObject();
  carrier.__BEIDOU__ = carrier.__BEIDOU__ || {
    extensions: {},
    hub: undefined,
  };
  return carrier;
}

/**
 * 返回挂载的hub实例
 */
export function getCurrentHub(): Hub {
  const registry = getMainCarrier();
  if (!hasHubOnCarrier(registry)) {
    setHubOnCarrier(registry, new Hub());
  }
  return getHubFromCarrier(registry);
}

/**
 * 全局是否挂载hub实例
 * @param carrier object
 */
function hasHubOnCarrier(carrier: Carrier): boolean {
  if (carrier && carrier.__BEIDOU__ && carrier.__BEIDOU__.hub) {
    return true;
  }
  return false;
}

/**
 * 全局载体挂载hub实例，并且返回一个hub实例
 * @param carrier object
 * @hidden
 */
export function getHubFromCarrier(carrier: Carrier): Hub {
  if (carrier && carrier.__BEIDOU__ && carrier.__BEIDOU__.hub) {
    return carrier.__BEIDOU__.hub;
  }
  carrier.__BEIDOU__ = carrier.__BEIDOU__ || {};
  carrier.__BEIDOU__.hub = new Hub();
  return carrier.__BEIDOU__.hub;
}

/**
 * 在全局挂载属性添加hub实例
 * @param carrier object
 * @param hub Hub
 */
export function setHubOnCarrier(carrier: Carrier, hub: Hub): boolean {
  if (!carrier) {
    return false;
  }
  carrier.__BEIDOU__ = carrier.__BEIDOU__ || {};
  carrier.__BEIDOU__.hub = hub;
  return true;
}
