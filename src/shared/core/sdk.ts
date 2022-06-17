import { Client, Options } from '../types';
import { logger } from '../utils';
import { getCurrentHub } from '../hub';

export type ClientClass<F extends Client, O extends Options> = new (options: O) => F;

export function initAndBind<F extends Client, O extends Options>(clientClass: ClientClass<F, O>, options: O): void {
  // debug 开启
  if (options.isDebug === true) {
    logger.enable();
  }
  const hub = getCurrentHub();
  const client = new clientClass(options);
  hub.bindClient(client);
}
