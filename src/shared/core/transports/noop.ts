import { Event, Response, Status, Transport } from '../../types';
import { SyncPromise } from '../../utils';

/** Noop transport */
export class NoopTransport implements Transport {
  /**
   * @inheritDoc
   */
  public sendEvent(_: Event): PromiseLike<Response> {
    return SyncPromise.resolve({
      reason: `NoopTransport: Event has been skipped`,
      status: Status.Skipped,
    });
  }

  /**
   * @inheritDoc
   */
  public close(_?: number): PromiseLike<boolean> {
    return SyncPromise.resolve(true);
  }
}
