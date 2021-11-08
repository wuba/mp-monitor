/***
 * 性能附件数据
 */
import { BeiDouTimeLine } from '../types/tracing';
/**
 * @file 获取navigation
 **/
import { Transaction } from './transaction';

export function addAppContexts(transaction: Transaction, beidouTimeLine: BeiDouTimeLine) {
  transaction.addPageContext({
    description: 'READY0',
    time: beidouTimeLine.ready - beidouTimeLine.in,
    extra: encodeURIComponent(JSON.stringify(beidouTimeLine.AppLaunch.extra))
  })
}