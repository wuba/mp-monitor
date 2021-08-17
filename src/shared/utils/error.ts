/**
 * @file 创建beidou错误,用于内部错误处理
 * * */

import { setPrototypeOf } from './polyfill';

/** An error emitted by Beidou SDKs and related utilities. */
export class BeidouError extends Error {
  /** Display name of this error instance. */
  public name: string;

  public constructor(public message: string) {
    super(message);

    this.name = new.target.prototype.constructor.name;
    setPrototypeOf(this, new.target.prototype);
  }
}
