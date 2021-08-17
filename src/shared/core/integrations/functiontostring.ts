import { Integration, WrappedFunction } from '../../types';

let originalFunctionToString: () => void;

/** Patch toString calls to return proper name for wrapped functions */
export class FunctionToString implements Integration {
  /**
   * @inheritDoc
   */
  public static id: string = 'FunctionToString';

  /**
   * @inheritDoc
   */
  public name: string = FunctionToString.id;

  /**
   * @inheritDoc
   */
  public setupOnce(): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    originalFunctionToString = Function.prototype.toString;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Function.prototype.toString = function(this: WrappedFunction, ...args: any[]): string {
      const context = this.__beidou_original__ || this;
      return originalFunctionToString.apply(context, args);
    };
  }
}
