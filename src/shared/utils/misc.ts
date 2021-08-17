import { Event, WrappedFunction } from '../types';

import { isString } from './is';


// 尽量挂载在__BEIDOU__下面,不影响全局空间
interface BeidouGlobal {
  __BEIDOU__: {
    globalEventProcessors: any;
    hub: any;
    logger: any;
    isInit: boolean;
  };
}

/**
 * Requires a module which is protected against bundler minification.
 *
 * @param request The module path to resolve
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function dynamicRequire(mod: any, request: string): any {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return mod.require(request);
}

/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */
export function isNodeEnv(): boolean {
  return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}

const fallbackGlobalObject = {};

/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
export function getGlobalObject<T>(): T & typeof globalThis & BeidouGlobal {
  return (isNodeEnv()
    ? global
    : typeof window !== 'undefined'
    ? window
    : typeof self !== 'undefined'
    ? self
    : fallbackGlobalObject) as T & typeof globalThis & BeidouGlobal;
}

/**
 * Extended Window interface that allows for Crypto API usage in IE browsers
 */
interface MsCryptoWindow extends Window {
  msCrypto?: Crypto;
}

/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */
export function uuid4(): string {
  const global = getGlobalObject() as MsCryptoWindow;
  const crypto = global.crypto || global.msCrypto;

  if (!(crypto === void 0) && crypto.getRandomValues) {
    // Use window.crypto API if available
    const arr = new Uint16Array(8);
    crypto.getRandomValues(arr);

    // set 4 in byte 7
    // eslint-disable-next-line no-bitwise
    arr[3] = (arr[3] & 0xfff) | 0x4000;
    // set 2 most significant bits of byte 9 to '10'
    // eslint-disable-next-line no-bitwise
    arr[4] = (arr[4] & 0x3fff) | 0x8000;

    const pad = (num: number): string => {
      let v = num.toString(16);
      while (v.length < 4) {
        v = `0${v}`;
      }
      return v;
    };

    return (
      pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7])
    );
  }
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Parses string form of URL into an object
 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
 * // intentionally using regex and not <a/> href parsing trick because React Native and other
 * // environments where DOM might not be available
 * @returns parsed URL object
 */
export function parseUrl(
  url: string,
): {
  host?: string;
  path?: string;
  protocol?: string;
  relative?: string;
} {
  if (!url) {
    return {};
  }

  const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);

  if (!match) {
    return {};
  }

  // coerce to undefined values to empty string so we don't get 'undefined'
  const query = match[6] || '';
  const fragment = match[8] || '';
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    relative: match[5] + query + fragment, // everything minus origin
  };
}

/**
 * Extracts either message or type+value from an event that can be used for user-facing logs
 * @returns event's description
 */
export function getEventDescription(event: Event): string {
  if (event.message) {
    return event.message;
  }
  if (event.exceptions && event.exceptions[0]) {
    const exception = event.exceptions[0];

    if (exception.content) {
      return exception.content;
    }
  }
  return '<unknown>';
}

/** JSDoc */
interface ExtensibleConsole extends Console {
  [key: string]: any;
}

/** JSDoc */
export function consoleSandbox(callback: () => any): any {
  const global = getGlobalObject<Window>();
  const levels = ['debug', 'info', 'warn', 'error', 'log', 'assert'];

  if (!('console' in global)) {
    return callback();
  }

  const originalConsole = global.console as ExtensibleConsole;
  const wrappedLevels: { [key: string]: any } = {};

  // Restore all wrapped console methods
  levels.forEach(level => {
    if (level in global.console && (originalConsole[level] as WrappedFunction).__beidou_original__) {
      wrappedLevels[level] = originalConsole[level] as WrappedFunction;
      originalConsole[level] = (originalConsole[level] as WrappedFunction).__beidou_original__;
    }
  });

  // Perform callback manipulations
  const result = callback();

  // Revert restoration to wrapped state
  Object.keys(wrappedLevels).forEach(level => {
    originalConsole[level] = wrappedLevels[level];
  });

  return result;
}

/**
 * Adds exception values, type and value to an synthetic Exception.
 * @param event The event to modify.
 * @param value Value of the exception.
 * @param type Type of the exception.
 * @hidden
 */
export function addExceptionTypeValue(event: Event, value?: string, type?: string): void {
  event.exceptions = event.exceptions || [];
  event.exceptions[0] = event.exceptions[0] || {};
  event.exceptions[0].content = event.exceptions[0].content || `${type}:${value}` || '';
}

/**
 * Adds exception mechanism to a given event.
 * @param event The event to modify.
 * @param mechanism Mechanism of the mechanism.
 * @hidden
 */
export function addExceptionMechanism(
  event: Event,
  mechanism: {
    [key: string]: any;
  } = {},
): void {
  // TODO: Use real type with `keyof Mechanism` thingy and maybe make it better?
  try {
    // @ts-ignore Type 'Mechanism | {}' is not assignable to type 'Mechanism | undefined'
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    event.exceptions![0].mechanism = event.exceptions![0].mechanism || {};
    Object.keys(mechanism).forEach(key => {
      // @ts-ignore Mechanism has no index signature
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      event.exceptions![0].mechanism[key] = mechanism[key];
    });
  } catch (_oO) {
    // no-empty
  }
}

/**
 * A safe form of location.href
 */
export function getLocationHref(): string {
  try {
    return document.location.href;
  } catch (oO) {
    return '';
  }
}

/**
 * 判断是否是开发模式
 */
export function isDevHref(): boolean {
  const _localHref = getLocationHref()
  if (_localHref.includes('localhost') || _localHref.includes('127.0.0.1')) {
    return true
  }
  return false
}

/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */
export function htmlTreeAsString(elem: unknown): string {
  type SimpleNode = {
    parentNode: SimpleNode;
  } | null;

  // try/catch both:
  // - accessing event.target (see getbeidou/raven-js#838, #768)
  // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
  // - can throw an exception in some circumstances.
  try {
    let currentElem = elem as SimpleNode;
    const MAX_TRAVERSE_HEIGHT = 5;
    const MAX_OUTPUT_LEN = 80;
    const out = [];
    let height = 0;
    let len = 0;
    const separator = ' > ';
    const sepLength = separator.length;
    let nextStr;

    // eslint-disable-next-line no-plusplus
    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = _htmlElementAsString(currentElem);
      // bail out if
      // - nextStr is the 'html' element
      // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
      //   (ignore this limit if we are on the first iteration)
      if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
        break;
      }

      out.push(nextStr);

      len += nextStr.length;
      currentElem = currentElem.parentNode;
    }

    return out.reverse().join(separator);
  } catch (_oO) {
    return '<unknown>';
  }
}

/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function _htmlElementAsString(el: unknown): string {
  const elem = el as {
    tagName?: string;
    id?: string;
    className?: string;
    getAttribute(key: string): string;
  };

  const out = [];
  let className;
  let classes;
  let key;
  let attr;
  let i;

  if (!elem || !elem.tagName) {
    return '';
  }

  out.push(elem.tagName.toLowerCase());
  if (elem.id) {
    out.push(`#${elem.id}`);
  }

  // eslint-disable-next-line prefer-const
  className = elem.className;
  if (className && isString(className)) {
    classes = className.split(/\s+/);
    for (i = 0; i < classes.length; i++) {
      out.push(`.${classes[i]}`);
    }
  }
  const allowedAttrs = ['type', 'name', 'title', 'alt'];
  for (i = 0; i < allowedAttrs.length; i++) {
    key = allowedAttrs[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.push(`[${key}="${attr}"]`);
    }
  }
  return out.join('');
}

const INITIAL_TIME = Date.now();
let prevNow = 0;

/**
 * Cross platform compatible partial performance implementation
 */
interface CrossPlatformPerformance {
  timeOrigin: number;
  /**
   * Returns the current timestamp in ms
   */
  now(): number;
}

const performanceFallback: CrossPlatformPerformance = {
  now(): number {
    let now = Date.now() - INITIAL_TIME;
    if (now < prevNow) {
      now = prevNow;
    }
    prevNow = now;
    return now;
  },
  timeOrigin: INITIAL_TIME,
};

export const crossPlatformPerformance: CrossPlatformPerformance = ((): CrossPlatformPerformance => {
  if (isNodeEnv()) {
    try {
      const perfHooks = dynamicRequire(module, 'perf_hooks') as { performance: CrossPlatformPerformance };
      return perfHooks.performance;
    } catch (_) {
      return performanceFallback;
    }
  }

  const { performance } = getGlobalObject<Window>();

  if (!performance || !performance.now) {
    return performanceFallback;
  }

  // Polyfill for performance.timeOrigin.
  //
  // While performance.timing.navigationStart is deprecated in favor of performance.timeOrigin, performance.timeOrigin
  // is not as widely supported. Namely, performance.timeOrigin is undefined in Safari as of writing.
  if (performance.timeOrigin === undefined) {
    // As of writing, performance.timing is not available in Web Workers in mainstream browsers, so it is not always a
    // valid fallback. In the absence of a initial time provided by the browser, fallback to INITIAL_TIME.
    // @ts-ignore ignored because timeOrigin is a readonly property but we want to override
    // eslint-disable-next-line deprecation/deprecation
    performance.timeOrigin = (performance.timing && performance.timing.navigationStart) || INITIAL_TIME;
  }

  return performance;
})();

/**
 * Returns a timestamp in seconds with milliseconds precision since the UNIX epoch calculated with the monotonic clock.
 */
export function timestampWithMs(): number {
  return (crossPlatformPerformance.timeOrigin + crossPlatformPerformance.now()) / 1000;
}

// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

/**
 * Represents Semantic Versioning object
 */
interface SemVer {
  major?: number;
  minor?: number;
  patch?: number;
  prerelease?: string;
  buildmetadata?: string;
}

/**
 * Parses input into a SemVer interface
 * @param input string representation of a semver version
 */
export function parseSemver(input: string): SemVer {
  const match = input.match(SEMVER_REGEXP) || [];
  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = parseInt(match[3], 10);
  return {
    buildmetadata: match[5],
    major: isNaN(major) ? undefined : major,
    minor: isNaN(minor) ? undefined : minor,
    patch: isNaN(patch) ? undefined : patch,
    prerelease: match[4],
  };
}

const defaultRetryAfter = 60 * 1000; // 60 seconds

/**
 * Extracts Retry-After value from the request header or returns default value
 * @param now current unix timestamp
 * @param header string representation of 'Retry-After' header
 */
export function parseRetryAfterHeader(now: number, header?: string | number | null): number {
  if (!header) {
    return defaultRetryAfter;
  }

  const headerDelay = parseInt(`${header}`, 10);
  if (!isNaN(headerDelay)) {
    return headerDelay * 1000;
  }

  const headerDate = Date.parse(`${header}`);
  if (!isNaN(headerDate)) {
    return headerDate - now;
  }

  return defaultRetryAfter;
}

const defaultFunctionName = '<anonymous>';

/**
 * Safely extract function name from itself
 */
export function getFunctionName(fn: unknown): string {
  try {
    if (!fn || typeof fn !== 'function') {
      return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
  } catch (e) {
    // Just accessing custom props in some Selenium environments
    // can cause a "Permission denied" exception (see raven-js#495).
    return defaultFunctionName;
  }
}
