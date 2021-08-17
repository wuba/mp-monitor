/**
 * @file 性能明细
 **/

import { SpanContext } from '../shared';
import { Span } from './span';
import { Transaction } from './transaction';
import { BeiDouTimeLine } from '../types/tracing'
import { timelineStructure } from '../constant'
export function _startChild(transaction: Transaction, { startTimestamp, ...ctx }: SpanContext): Span {
  if (startTimestamp && transaction.startTimestamp > startTimestamp) {
    transaction.startTimestamp = startTimestamp;
  }

  return transaction.startChild({
    startTimestamp,
    ...ctx,
  });
}

export function addNavigationSpans(transaction: Transaction, beidouTimeLine: BeiDouTimeLine): void {

  timelineStructure
    .forEach(structure => {
      _startChild(transaction, {
        description: structure.description,
        startTimestamp: beidouTimeLine[structure.startTimestamp],
        endTimestamp: beidouTimeLine[structure.endTimestamp],
      });
    });


}