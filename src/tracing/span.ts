/* eslint-disable max-lines */
import { Span as SpanInterface, SpanContext, PageContext, utils } from '../shared'

import { DEFAULT_MAX_SPAN } from '../constant'

const { timestampWithMs, isPlainObject } = utils

/**
 * Keeps track of finished spans for a given transaction
 * @internal
 * @hideconstructor
 * @hidden
 */
export class SpanRecorder {
  public spans: Span[] = [];
  public add(span: Span): void {
    if (this.spans.length > DEFAULT_MAX_SPAN) {
      delete span.spanRecorder
    } else {
      this.spans.push(span);
    }
  }
}

/**
 * Span contains all data about a span
 */
export class Span implements SpanInterface, SpanContext {
  public startTimestamp: number = timestampWithMs();
  public endTimestamp?: number;
  public description?: string;
  public spanRecorder?: SpanRecorder;
  public pageContexts: PageContext[] = [];
  public constructor(spanContext?: SpanContext) {
    if (!spanContext || !isPlainObject(spanContext)) {
      return this;
    }
    // span标示
    if (spanContext.description) {
      this.description = spanContext.description;
    }
    // span开始时间
    if (typeof spanContext.startTimestamp !== 'undefined') {
      this.startTimestamp = spanContext.startTimestamp;
    }
    // span结束时间
    if (typeof spanContext.endTimestamp !== 'undefined') {
      this.endTimestamp = spanContext.endTimestamp;
    }
  }

  addPageContext(ctx: PageContext): void {
    this.pageContexts.push(ctx)
  }
  /**
   * @inheritDoc
   * @deprecated
   */
  public child(
    spanContext?: Pick<SpanContext, Exclude<keyof SpanContext, 'spanId' | 'sampled' | 'traceId' | 'parentSpanId'>>,
  ): Span {
    return this.startChild(spanContext);
  }

  /**
   * @inheritDoc
   */
  public startChild(
    spanContext?: SpanContext,
  ): Span {
    const span = new Span({
      ...spanContext,
    });

    span.spanRecorder = this.spanRecorder;
    if (span.spanRecorder) {
      span.spanRecorder.add(span);
    }
    return span;
  }

  /**
   * @inheritDoc
   */
  public finish(endTimestamp?: number): void {
    this.endTimestamp = typeof endTimestamp === 'number' ? endTimestamp : timestampWithMs();
  }
}
