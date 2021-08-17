import {
  EventProcessor,
  Integration,
  TransactionContext,
  SpanContext,
  Span, reducer, utils
} from "../shared";

import { Transaction } from './transaction';
import { DEFAULT_NAVIGATION_NAME } from '../constant';
import { MPVitals } from "./vitals";

/**
 * Tracing integration for React Native.
 */
export class MPTracing implements Integration {
  /**
   * @inheritDoc
   */
  public static id: string = "MPTracing";
  /**
   * @inheritDoc
   */
  public name: string = MPTracing.id;


  private _getCurrentHub?: () => reducer.Hub;


  /**
   *  Registers routing and request instrumentation.
   */
  public setupOnce(
    // @ts-ignore TODO
    addGlobalEventProcessor: (callback: EventProcessor) => void,
    getCurrentHub: () => reducer.Hub
  ): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method

    this._getCurrentHub = getCurrentHub;
    this._createRouteTransaction()
    // todo: init performance
  }

  /** Create route transaction. */
  private _createRouteTransaction(): void {
    if (!this._getCurrentHub) {
      utils.logger.warn(`hub 必须存在`);
      return undefined;
    }
    const hub = this._getCurrentHub();
    // pageLoad
    const context: TransactionContext = {
      name: DEFAULT_NAVIGATION_NAME
    }
    const transaction = Transaction.instance(context, hub);
    transaction.initSpanRecorder();
    MPVitals.instance();
  }
}

export function _startChild(transaction: Transaction, { startTimestamp, ...ctx }: SpanContext): Span {
  if (startTimestamp && transaction.startTimestamp > startTimestamp) {
    transaction.startTimestamp = startTimestamp;
  }

  return transaction.startChild({
    startTimestamp,
    ...ctx,
  });
}
