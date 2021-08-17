import { addGlobalEventProcessor, getCurrentHub } from '../../hub';
import { Event, Integration } from '../../types';
import { getEventDescription, isMatchingPattern, logger } from '../../utils';

// "Script error." is hard coded into browsers for errors that it can't read.
// this is the result of a script being pulled in from an external domain and CORS.
const DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];

/** JSDoc */
interface InboundFiltersOptions {
  allowUrls: Array<string | RegExp>;
  denyUrls: Array<string | RegExp>;
  ignoreErrors: Array<string | RegExp>;
  ignoreInternal: boolean;
}

/** Inbound filters configurable by the user */
export class InboundFilters implements Integration {
  /**
   * @inheritDoc
   */
  public static id: string = 'InboundFilters';

  /**
   * @inheritDoc
   */
  public name: string = InboundFilters.id;

  public constructor(private readonly _options: Partial<InboundFiltersOptions> = {}) { }

  /**
   * @inheritDoc
   */
  public setupOnce(): void {
    addGlobalEventProcessor((event: Event) => {
      const hub = getCurrentHub();
      if (!hub) {
        return event;
      }
      const self = hub.getIntegration(InboundFilters);
      if (self) {
        const client = hub.getClient();
        const clientOptions = client ? client.getOptions() : {};
        const options = self._mergeOptions(clientOptions);
        if (self._shouldDropEvent(event, options)) {
          return null;
        }
      }
      return event;
    });
  }

  /** JSDoc */
  private _shouldDropEvent(event: Event, options: Partial<InboundFiltersOptions>): boolean {
    if (this._isBeidouError(event, options)) {
      logger.warn(`Event dropped due to being internal Beidou Error.\nEvent: ${getEventDescription(event)}`);
      return true;
    }
    if (this._isIgnoredError(event, options)) {
      logger.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${getEventDescription(event)}`,
      );
      return true;
    }
    if (this._isDeniedUrl(event, options)) {
      logger.warn(
        `Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${getEventDescription(
          event,
        )}.\nUrl: ${this._getEventFilterUrl(event)}`,
      );
      return true;
    }
    if (!this._isAllowedUrl(event, options)) {
      logger.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${getEventDescription(
          event,
        )}.\nUrl: ${this._getEventFilterUrl(event)}`,
      );
      return true;
    }
    return false;
  }

  /** JSDoc */
  private _isBeidouError(event: Event, options: Partial<InboundFiltersOptions>): boolean {
    if (!options.ignoreInternal) {
      return false;
    }

    try {
      return (
        (event &&
          event.exceptions &&
          event.exceptions[0] &&
          event.exceptions[0].content &&
          event.exceptions[0].content.indexOf('BeidouError') > -1) ||
        false
      );
    } catch (_oO) {
      return false;
    }
  }

  /** JSDoc */
  private _isIgnoredError(event: Event, options: Partial<InboundFiltersOptions>): boolean {
    if (!options.ignoreErrors || !options.ignoreErrors.length) {
      return false;
    }

    return this._getPossibleEventMessages(event).some(message =>
      // Not sure why TypeScript complains here...
      (options.ignoreErrors as Array<RegExp | string>).some(pattern => isMatchingPattern(message, pattern)),
    );
  }

  /** JSDoc */
  private _isDeniedUrl(event: Event, options: Partial<InboundFiltersOptions>): boolean {
    // TODO: Use Glob instead?
    if (!options.denyUrls || !options.denyUrls.length) {
      return false;
    }
    const url = this._getEventFilterUrl(event);
    return !url ? false : options.denyUrls.some(pattern => isMatchingPattern(url, pattern));
  }

  /** JSDoc */
  private _isAllowedUrl(event: Event, options: Partial<InboundFiltersOptions>): boolean {
    // TODO: Use Glob instead?
    if (!options.allowUrls || !options.allowUrls.length) {
      return true;
    }
    const url = this._getEventFilterUrl(event);
    return !url ? true : options.allowUrls.some(pattern => isMatchingPattern(url, pattern));
  }

  /** JSDoc */
  private _mergeOptions(clientOptions: Partial<InboundFiltersOptions> = {}): Partial<InboundFiltersOptions> {
    return {
      allowUrls: [
        // eslint-disable-next-line deprecation/deprecation
        ...(this._options.allowUrls || []),
        // eslint-disable-next-line deprecation/deprecation
        ...(clientOptions.allowUrls || []),
      ],
      denyUrls: [
        // eslint-disable-next-line deprecation/deprecation
        ...(this._options.denyUrls || []),
        // eslint-disable-next-line deprecation/deprecation
        ...(clientOptions.denyUrls || []),
      ],
      ignoreErrors: [
        ...(this._options.ignoreErrors || []),
        ...(clientOptions.ignoreErrors || []),
        ...DEFAULT_IGNORE_ERRORS,
      ],
      ignoreInternal: typeof this._options.ignoreInternal !== 'undefined' ? this._options.ignoreInternal : true,
    };
  }

  /** JSDoc */
  private _getPossibleEventMessages(event: Event): string[] {
    if (event.exceptions) {
      try {
        const { content = '' } = (event.exceptions && event.exceptions[0]) || {};
        return [content];
      } catch (oO) {
        logger.error(`Cannot extract message for event ${getEventDescription(event)}`);
        return [];
      }
    }
    return [];
  }

  /** JSDoc */
  private _getEventFilterUrl(event: Event): string | null {
    try {
      if (event.exceptions) {
        const frames = event.exceptions[0] && event.exceptions[0].stacktrace;
        return (frames && frames[frames.length - 1].filename) || null;
      }
      return null;
    } catch (oO) {
      logger.error(`Cannot extract url for event ${getEventDescription(event)}`);
      return null;
    }
  }
}
