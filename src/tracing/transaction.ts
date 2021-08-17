import { TransactionContext, utils, reducer } from '../shared';
import { Span as SpanClass, SpanRecorder } from './span';
const { isInstanceOf, logger } = utils
const { getCurrentHub } = reducer;

// @ts-ignore
let instance: Transaction = null;

export class Transaction extends SpanClass {
  public name?: string;
  private readonly _hub: any = (getCurrentHub() as unknown) as any;

  public constructor(transactionContext: TransactionContext, hub?: reducer.Hub) {
    super(transactionContext);

    if (isInstanceOf(hub, reducer.Hub)) {
      this._hub = hub as reducer.Hub;
    }

    if (transactionContext.name) {
      this.name = transactionContext.name;
    }
  }

  /**
   * JSDoc
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Attaches SpanRecorder to the span itself
   * @param maxlen maximum number of spans that can be recorded
   */
  public initSpanRecorder(): void {
    if (!this.spanRecorder) {
      this.spanRecorder = new SpanRecorder();
    }
    this.spanRecorder.add(this);
  }

  /**
   * @inheritDoc
   */
  public finish(endTimestamp?: number): void {

    if (!this.name) {
      logger.warn('Transaction has no name, falling back to `<unlabeled transaction>`.');
      this.name = '<unlabeled transaction>';
    }

    super.finish(endTimestamp);

    const finishedSpans = this.spanRecorder ? this.spanRecorder.spans.filter(s => s !== this && s.endTimestamp) : [];
    // 上报数据格式和字段处理
    const _finishedSpans = finishedSpans.map(span => {
      return {
        description: span.description,
        endTimestamp: span.endTimestamp,
        startTimestamp: span.startTimestamp,
      };
    });

    this._hub.captureEvent({
      performances: [
        {
          contexts: this.pageContexts,
          spans: _finishedSpans
        }
      ],
      type: 'performance',
    });

    // 上报成功后重制性能计算时间轴
    this.pageContexts = [];
    this.spanRecorder = new SpanRecorder();
  }

  static instance(ctx?: any, hub?: any): Transaction {
    if (instance) return instance;

    instance = new Transaction(ctx, hub);

    return instance;
  }
}
