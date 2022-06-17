/* eslint-disable @typescript-eslint/no-explicit-any */
import { consoleSandbox, getGlobalObject } from './misc';

// TODO: Implement different loggers for different environments
const global = getGlobalObject<Window>();

/** Prefix for logging strings */
const PREFIX = 'MpMonitor Logger ';

/** JSDoc */
class Logger {
  /** JSDoc */
  private _enabled: boolean;

  /** JSDoc */
  public constructor() {
    this._enabled = false;
  }

  /** JSDoc */
  public disable(): void {
    this._enabled = false;
  }

  /** JSDoc */
  public enable(): void {
    this._enabled = true;
  }

  /** JSDoc */
  public log(...args: any[]): void {
    if (!this._enabled) {
      return;
    }
    consoleSandbox(() => {
      global.console.log(`${PREFIX}[Log]: ${args.join(' ')}`);
    });
  }

  /** JSDoc */
  public warn(...args: any[]): void {
    if (!this._enabled) {
      return;
    }
    consoleSandbox(() => {
      global.console.warn(`${PREFIX}[Warn]: ${args.join(' ')}`);
    });
  }

  /** JSDoc */
  public error(...args: any[]): void {
    if (!this._enabled) {
      return;
    }
    consoleSandbox(() => {
      global.console.error(`${PREFIX}[Error]: ${args.join(' ')}`);
    });
  }
}

global.__BEIDOU__ = global.__BEIDOU__ || {};
const logger = (global.__BEIDOU__.logger as Logger) || (global.__BEIDOU__.logger = new Logger());

export { logger };
