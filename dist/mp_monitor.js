'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

if (typeof window === 'undefined') {
  // @ts-ignore
  window = {
    console: console
  };
} else if (!window.console) {
  window.console = console;
}

if (typeof navigator === 'undefined') {
  // @ts-ignore
  navigator = {
    userAgent: ''
  };
}

if (global && !global.console) {
  global.console = console;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var setPrototypeOf = Object.setPrototypeOf || ({
  __proto__: []
} instanceof Array ? setProtoOf : mixinProperties);
/**
 * setPrototypeOf polyfill using __proto__
 */
// eslint-disable-next-line @typescript-eslint/ban-types

function setProtoOf(obj, proto) {
  // @ts-ignore __proto__ does not exist on obj
  obj.__proto__ = proto;
  return obj;
}
/**
 * setPrototypeOf polyfill using mixin
 */
// eslint-disable-next-line @typescript-eslint/ban-types


function mixinProperties(obj, proto) {
  for (var prop in proto) {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(prop)) {
      // @ts-ignore typescript complains about indexing so we remove
      obj[prop] = proto[prop];
    }
  }

  return obj;
}

/**
 * @file 创建beidou错误,用于内部错误处理
 * * */
/** An error emitted by Beidou SDKs and related utilities. */

var BeidouError$1 = function (_super) {
  __extends(BeidouError, _super);

  function BeidouError(message) {
    var _newTarget = this.constructor;

    var _this = _super.call(this, message) || this;

    _this.message = message;
    _this.name = _newTarget.prototype.constructor.name;
    setPrototypeOf(_this, _newTarget.prototype);
    return _this;
  }

  return BeidouError;
}(Error);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * Requires a module which is protected against bundler minification.
 *
 * @param request The module path to resolve
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

function dynamicRequire(mod, request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return mod.require(request);
}
/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */

function isNodeEnv() {
  return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}
var fallbackGlobalObject = {};
/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */

function getGlobalObject$1() {
  return isNodeEnv() ? global : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : fallbackGlobalObject;
}
/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */

function uuid4$3() {
  var global = getGlobalObject$1();
  var crypto = global.crypto || global.msCrypto;

  if (!(crypto === void 0) && crypto.getRandomValues) {
    // Use window.crypto API if available
    var arr = new Uint16Array(8);
    crypto.getRandomValues(arr); // set 4 in byte 7
    // eslint-disable-next-line no-bitwise

    arr[3] = arr[3] & 0xfff | 0x4000; // set 2 most significant bits of byte 9 to '10'
    // eslint-disable-next-line no-bitwise

    arr[4] = arr[4] & 0x3fff | 0x8000;

    var pad = function pad(num) {
      var v = num.toString(16);

      while (v.length < 4) {
        v = "0" + v;
      }

      return v;
    };

    return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
  } // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523


  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    var r = Math.random() * 16 | 0; // eslint-disable-next-line no-bitwise

    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/** JSDoc */

function consoleSandbox(callback) {
  var global = getGlobalObject$1();
  var levels = ['debug', 'info', 'warn', 'error', 'log', 'assert'];

  if (!('console' in global)) {
    return callback();
  }

  var originalConsole = global.console;
  var wrappedLevels = {}; // Restore all wrapped console methods

  levels.forEach(function (level) {
    if (level in global.console && originalConsole[level].__beidou_original__) {
      wrappedLevels[level] = originalConsole[level];
      originalConsole[level] = originalConsole[level].__beidou_original__;
    }
  }); // Perform callback manipulations

  var result = callback(); // Revert restoration to wrapped state

  Object.keys(wrappedLevels).forEach(function (level) {
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

function addExceptionTypeValue$1(event, value, type) {
  event.exceptions = event.exceptions || [];
  event.exceptions[0] = event.exceptions[0] || {};
  event.exceptions[0].content = event.exceptions[0].content || type + ":" + value || '';
}
/**
 * Adds exception mechanism to a given event.
 * @param event The event to modify.
 * @param mechanism Mechanism of the mechanism.
 * @hidden
 */

function addExceptionMechanism$1(event, mechanism) {
  if (mechanism === void 0) {
    mechanism = {};
  } // TODO: Use real type with `keyof Mechanism` thingy and maybe make it better?


  try {
    // @ts-ignore Type 'Mechanism | {}' is not assignable to type 'Mechanism | undefined'
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    event.exceptions[0].mechanism = event.exceptions[0].mechanism || {};
    Object.keys(mechanism).forEach(function (key) {
      // @ts-ignore Mechanism has no index signature
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      event.exceptions[0].mechanism[key] = mechanism[key];
    });
  } catch (_oO) {// no-empty
  }
}
/**
 * A safe form of location.href
 */

function getLocationHref() {
  try {
    return document.location.href;
  } catch (oO) {
    return '';
  }
}
/**
 * 判断是否是开发模式
 */

function isDevHref() {
  var _localHref = getLocationHref();

  if (_localHref.includes('localhost') || _localHref.includes('127.0.0.1')) {
    return true;
  }

  return false;
}
/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */

function htmlTreeAsString(elem) {
  // try/catch both:
  // - accessing event.target (see getbeidou/raven-js#838, #768)
  // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
  // - can throw an exception in some circumstances.
  try {
    var currentElem = elem;
    var MAX_TRAVERSE_HEIGHT = 5;
    var MAX_OUTPUT_LEN = 80;
    var out = [];
    var height = 0;
    var len = 0;
    var separator = ' > ';
    var sepLength = separator.length;
    var nextStr = void 0; // eslint-disable-next-line no-plusplus

    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = _htmlElementAsString(currentElem); // bail out if
      // - nextStr is the 'html' element
      // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
      //   (ignore this limit if we are on the first iteration)

      if (nextStr === 'html' || height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN) {
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

function _htmlElementAsString(el) {
  var elem = el;
  var out = [];
  var className;
  var classes;
  var key;
  var attr;
  var i;

  if (!elem || !elem.tagName) {
    return '';
  }

  out.push(elem.tagName.toLowerCase());

  if (elem.id) {
    out.push("#" + elem.id);
  } // eslint-disable-next-line prefer-const


  className = elem.className;

  if (className && isString$1(className)) {
    classes = className.split(/\s+/);

    for (i = 0; i < classes.length; i++) {
      out.push("." + classes[i]);
    }
  }

  var allowedAttrs = ['type', 'name', 'title', 'alt'];

  for (i = 0; i < allowedAttrs.length; i++) {
    key = allowedAttrs[i];
    attr = elem.getAttribute(key);

    if (attr) {
      out.push("[" + key + "=\"" + attr + "\"]");
    }
  }

  return out.join('');
}

var INITIAL_TIME = Date.now();
var prevNow = 0;
var performanceFallback = {
  now: function now() {
    var now = Date.now() - INITIAL_TIME;

    if (now < prevNow) {
      now = prevNow;
    }

    prevNow = now;
    return now;
  },
  timeOrigin: INITIAL_TIME
};
var crossPlatformPerformance = function () {
  if (isNodeEnv()) {
    try {
      var perfHooks = dynamicRequire(module, 'perf_hooks');
      return perfHooks.performance;
    } catch (_) {
      return performanceFallback;
    }
  }

  var performance = getGlobalObject$1().performance;

  if (!performance || !performance.now) {
    return performanceFallback;
  } // Polyfill for performance.timeOrigin.
  //
  // While performance.timing.navigationStart is deprecated in favor of performance.timeOrigin, performance.timeOrigin
  // is not as widely supported. Namely, performance.timeOrigin is undefined in Safari as of writing.


  if (performance.timeOrigin === undefined) {
    // As of writing, performance.timing is not available in Web Workers in mainstream browsers, so it is not always a
    // valid fallback. In the absence of a initial time provided by the browser, fallback to INITIAL_TIME.
    // @ts-ignore ignored because timeOrigin is a readonly property but we want to override
    // eslint-disable-next-line deprecation/deprecation
    performance.timeOrigin = performance.timing && performance.timing.navigationStart || INITIAL_TIME;
  }

  return performance;
}();
/**
 * Returns a timestamp in seconds with milliseconds precision since the UNIX epoch calculated with the monotonic clock.
 */

function timestampWithMs$1() {
  return (crossPlatformPerformance.timeOrigin + crossPlatformPerformance.now()) / 1000;
} // https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
var defaultRetryAfter = 60 * 1000; // 60 seconds

/**
 * Extracts Retry-After value from the request header or returns default value
 * @param now current unix timestamp
 * @param header string representation of 'Retry-After' header
 */

function parseRetryAfterHeader$1(now, header) {
  if (!header) {
    return defaultRetryAfter;
  }

  var headerDelay = parseInt("" + header, 10);

  if (!isNaN(headerDelay)) {
    return headerDelay * 1000;
  }

  var headerDate = Date.parse("" + header);

  if (!isNaN(headerDate)) {
    return headerDate - now;
  }

  return defaultRetryAfter;
}
var defaultFunctionName = '<anonymous>';
/**
 * Safely extract function name from itself
 */

function getFunctionName$1(fn) {
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

getGlobalObject$1();
function isError$1(wat) {
  switch (Object.prototype.toString.call(wat)) {
    case '[object Error]':
      return true;

    case '[object Exception]':
      return true;

    case '[object DOMException]':
      return true;

    default:
      return isInstanceOf$1(wat, Error);
  }
}
/**
 * Checks whether given value's type is ErrorEvent
 * {@link isErrorEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isErrorEvent$1(wat) {
  return Object.prototype.toString.call(wat) === '[object ErrorEvent]';
}
/**
 * Checks whether given value's type is DOMError
 * {@link isDOMError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isDOMError$1(wat) {
  return Object.prototype.toString.call(wat) === '[object DOMError]';
}
/**
 * Checks whether given value's type is DOMException
 * {@link isDOMException}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isDOMException$1(wat) {
  return Object.prototype.toString.call(wat) === '[object DOMException]';
}
/**
 * Checks whether given value's type is a string
 * {@link isString}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isString$1(wat) {
  return Object.prototype.toString.call(wat) === '[object String]';
}
/**
 * Checks whether given value's is a primitive (undefined, null, number, boolean, string)
 * {@link isPrimitive}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isPrimitive(wat) {
  return wat === null || _typeof(wat) !== 'object' && typeof wat !== 'function';
}
/**
 * Checks whether given value's type is an object literal
 * {@link isPlainObject}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isPlainObject$2(wat) {
  return Object.prototype.toString.call(wat) === '[object Object]';
}
/**
 * Checks whether given value's type is an Event instance
 * {@link isEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isEvent$2(wat) {
  return typeof Event !== 'undefined' && isInstanceOf$1(wat, Event);
}
/**
 * Checks whether given value's type is an Element instance
 * {@link isElement}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isElement(wat) {
  return typeof Element !== 'undefined' && isInstanceOf$1(wat, Element);
}
/**
 * Checks whether given value has a then function.
 * @param wat A value to be checked.
 */

function isThenable(wat) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return Boolean(wat && wat.then && typeof wat.then === 'function');
}
/**
 * Checks whether given value's type is a SyntheticEvent
 * {@link isSyntheticEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isSyntheticEvent(wat) {
  return isPlainObject$2(wat) && 'nativeEvent' in wat && 'preventDefault' in wat && 'stopPropagation' in wat;
}
/**
 * Checks whether given value's type is an instance of provided constructor.
 * {@link isInstanceOf}.
 *
 * @param wat A value to be checked.
 * @param base A constructor to be used in a check.
 * @returns A boolean representing the result.
 */

function isInstanceOf$1(wat, base) {
  try {
    return wat instanceof base;
  } catch (_e) {
    return false;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

var global$2 = getGlobalObject$1();
/** Prefix for logging strings */

var PREFIX = 'MpMonitor Logger ';
/** JSDoc */

var Logger = function () {
  /** JSDoc */
  function Logger() {
    this._enabled = false;
  }
  /** JSDoc */


  Logger.prototype.disable = function () {
    this._enabled = false;
  };
  /** JSDoc */


  Logger.prototype.enable = function () {
    this._enabled = true;
  };
  /** JSDoc */


  Logger.prototype.log = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (!this._enabled) {
      return;
    }

    consoleSandbox(function () {
      global$2.console.log(PREFIX + "[Log]: " + args.join(' '));
    });
  };
  /** JSDoc */


  Logger.prototype.warn = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (!this._enabled) {
      return;
    }

    consoleSandbox(function () {
      global$2.console.warn(PREFIX + "[Warn]: " + args.join(' '));
    });
  };
  /** JSDoc */


  Logger.prototype.error = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (!this._enabled) {
      return;
    }

    consoleSandbox(function () {
      global$2.console.error(PREFIX + "[Error]: " + args.join(' '));
    });
  };

  return Logger;
}();

global$2.__BEIDOU__ = global$2.__BEIDOU__ || {};
var logger$5 = global$2.__BEIDOU__.logger || (global$2.__BEIDOU__.logger = new Logger());

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Memo class used for decycle json objects. Uses WeakSet if available otherwise array.
 */
var Memo = function () {
  function Memo() {
    this._hasWeakSet = typeof WeakSet === 'function';
    this._inner = this._hasWeakSet ? new WeakSet() : [];
  }
  /**
   * Sets obj to remember.
   * @param obj Object to remember
   */


  Memo.prototype.memoize = function (obj) {
    if (this._hasWeakSet) {
      if (this._inner.has(obj)) {
        return true;
      }

      this._inner.add(obj);

      return false;
    } // eslint-disable-next-line @typescript-eslint/prefer-for-of


    for (var i = 0; i < this._inner.length; i++) {
      var value = this._inner[i];

      if (value === obj) {
        return true;
      }
    }

    this._inner.push(obj);

    return false;
  };
  /**
   * Removes object from internal storage.
   * @param obj Object to forget
   */


  Memo.prototype.unmemoize = function (obj) {
    if (this._hasWeakSet) {
      this._inner["delete"](obj);
    } else {
      for (var i = 0; i < this._inner.length; i++) {
        if (this._inner[i] === obj) {
          this._inner.splice(i, 1);

          break;
        }
      }
    }
  };

  return Memo;
}();

/**
 * Truncates given string to the maximum characters count
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */

function truncate(str, max) {
  if (max === void 0) {
    max = 0;
  }

  if (typeof str !== 'string' || max === 0) {
    return str;
  }

  return str.length <= max ? str : str.substr(0, max) + "...";
}

/**
 * Transforms any object into an object literal with all it's attributes
 * attached to it.
 *
 * @param value Initial source that we have to transform in order to be usable by the serializer
 */

function getWalkSource(value) {
  if (isError$1(value)) {
    var error = value;
    var err = {
      message: error.message,
      name: error.name,
      stack: error.stack
    };

    for (var i in error) {
      if (Object.prototype.hasOwnProperty.call(error, i)) {
        err[i] = error[i];
      }
    }

    return err;
  }

  if (isEvent$2(value)) {
    var event_1 = value;
    var source = {};
    source.type = event_1.type; // Accessing event.target can throw (see getbeidou/raven-js#838, #768)

    try {
      source.target = isElement(event_1.target) ? htmlTreeAsString(event_1.target) : Object.prototype.toString.call(event_1.target);
    } catch (_oO) {
      source.target = '<unknown>';
    }

    try {
      source.currentTarget = isElement(event_1.currentTarget) ? htmlTreeAsString(event_1.currentTarget) : Object.prototype.toString.call(event_1.currentTarget);
    } catch (_oO) {
      source.currentTarget = '<unknown>';
    }

    if (typeof CustomEvent !== 'undefined' && isInstanceOf$1(value, CustomEvent)) {
      source.detail = event_1.detail;
    }

    for (var i in event_1) {
      if (Object.prototype.hasOwnProperty.call(event_1, i)) {
        source[i] = event_1;
      }
    }

    return source;
  }

  return value;
}
/** Transforms any input value into a string form, either primitive value or a type of the input */

function serializeValue(value) {
  var type = Object.prototype.toString.call(value); // Node.js REPL notation

  if (typeof value === 'string') {
    return value;
  }

  if (type === '[object Object]') {
    return '[Object]';
  }

  if (type === '[object Array]') {
    return '[Array]';
  }

  var normalized = normalizeValue(value);
  return isPrimitive(normalized) ? normalized : type;
}
/**
 * normalizeValue()
 *
 * Takes unserializable input and make it serializable friendly
 *
 * - translates undefined/NaN values to "[undefined]"/"[NaN]" respectively,
 * - serializes Error objects
 * - filter global objects
 */


function normalizeValue(value, key) {
  if (key === 'domain' && value && _typeof(value) === 'object' && value._events) {
    return '[Domain]';
  }

  if (key === 'domainEmitter') {
    return '[DomainEmitter]';
  }

  if (typeof global !== 'undefined' && value === global) {
    return '[Global]';
  }

  if (typeof window !== 'undefined' && value === window) {
    return '[Window]';
  }

  if (typeof document !== 'undefined' && value === document) {
    return '[Document]';
  } // React's SyntheticEvent thingy


  if (isSyntheticEvent(value)) {
    return '[SyntheticEvent]';
  }

  if (typeof value === 'number' && value !== value) {
    return '[NaN]';
  }

  if (value === void 0) {
    return '[undefined]';
  }

  if (typeof value === 'function') {
    return "[Function: " + getFunctionName$1(value) + "]";
  }

  return value;
}
/**
 * Walks an object to perform a normalization on it
 *
 * @param key of object that's walked in current iteration
 * @param value object to be walked
 * @param depth Optional number indicating how deep should walking be performed
 * @param memo Optional Memo class handling decycling
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types


function walk(key, value, depth, memo) {
  if (depth === void 0) {
    depth = +Infinity;
  }

  if (memo === void 0) {
    memo = new Memo();
  } // If we reach the maximum depth, serialize whatever has left


  if (depth === 0) {
    return serializeValue(value);
  }
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  // If value implements `toJSON` method, call it and return early


  if (value !== null && value !== undefined && typeof value.toJSON === 'function') {
    return value.toJSON();
  }
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  // If normalized value is a primitive, there are no branches left to walk, so we can just bail out, as theres no point in going down that branch any further


  var normalized = normalizeValue(value, key);

  if (isPrimitive(normalized)) {
    return normalized;
  } // Create source that we will use for next itterations, either objectified error object (Error type with extracted keys:value pairs) or the input itself


  var source = getWalkSource(value); // Create an accumulator that will act as a parent for all future itterations of that branch

  var acc = Array.isArray(value) ? [] : {}; // If we already walked that branch, bail out, as it's circular reference

  if (memo.memoize(value)) {
    return '[Circular ~]';
  } // Walk all keys of the source


  for (var innerKey in source) {
    // Avoid iterating over fields in the prototype if they've somehow been exposed to enumeration.
    if (!Object.prototype.hasOwnProperty.call(source, innerKey)) {
      continue;
    } // Recursively walk through all the child nodes


    acc[innerKey] = walk(innerKey, source[innerKey], depth - 1, memo);
  } // Once walked through all the branches, remove the parent from memo storage


  memo.unmemoize(value); // Return accumulated values

  return acc;
}
/**
 * normalize()
 *
 * - Creates a copy to prevent original input mutation
 * - Skip non-enumerablers
 * - Calls `toJSON` if implemented
 * - Removes circular references
 * - Translates non-serializeable values (undefined/NaN/Functions) to serializable format
 * - Translates known global objects/Classes to a string representations
 * - Takes care of Error objects serialization
 * - Optionally limit depth of final output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

function normalize(input, depth) {
  try {
    return JSON.parse(JSON.stringify(input, function (key, value) {
      return walk(key, value, depth);
    }));
  } catch (_oO) {
    return '**non-serializable**';
  }
}
/**
 * Given any captured exception, extract its keys and create a sorted
 * and truncated list that will be used inside the event message.
 * eg. `Non-error exception captured with keys: foo, bar, baz`
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

function extractExceptionKeysForMessage$1(exception, maxLength) {
  if (maxLength === void 0) {
    maxLength = 40;
  }

  var keys = Object.keys(getWalkSource(exception));
  keys.sort();

  if (!keys.length) {
    return '[object has no keys]';
  }

  if (keys[0].length >= maxLength) {
    return truncate(keys[0], maxLength);
  }

  for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
    var serialized = keys.slice(0, includedKeys).join(', ');

    if (serialized.length > maxLength) {
      continue;
    }

    if (includedKeys === keys.length) {
      return serialized;
    }

    return truncate(serialized, maxLength);
  }

  return '';
}
/**
 * Wrap a given object method with a higher-order function
 *
 * @param source An object that contains a method to be wrapped.
 * @param name A name of method to be wrapped.
 * @param replacement A function that should be used to wrap a given method.
 * @returns void
 */

function intercept$1(source, name, replacement) {
  var _a;

  if (!(name in source)) {
    return;
  }

  var original = source[name];
  var wrapped = replacement(original); // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
  // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"

  if (typeof wrapped === 'function') {
    try {
      Object.defineProperties(source, (_a = {}, _a[name] = {
        configurable: true,
        enumerable: true,
        writable: true,
        value: wrapped
      }, _a));
    } catch (_Oo) {// This can throw if multiple fill happens on a global object like XMLHttpRequest
      // Fixes https://github.com/getbeidou/beidou-javascript/issues/2043
    }
  } else {
    source[name] = wrapped;
  }
} // 按照指定规则，过滤 object 中的相关值。类似 Array.filter

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/** SyncPromise internal states */

var States;

(function (States) {
  /** Pending */
  States["PENDING"] = "PENDING";
  /** Resolved / OK */

  States["RESOLVED"] = "RESOLVED";
  /** Rejected / Error */

  States["REJECTED"] = "REJECTED";
})(States || (States = {}));
/**
 * Thenable class that behaves like a Promise and follows it's interface
 * but is not async internally
 */


var SyncPromise$2 = function () {
  function SyncPromise(executor) {
    var _this = this;

    this._state = States.PENDING;
    this._handlers = [];
    /** JSDoc */

    this._resolve = function (value) {
      _this._setResult(States.RESOLVED, value);
    };
    /** JSDoc */


    this._reject = function (reason) {
      _this._setResult(States.REJECTED, reason);
    };
    /** JSDoc */


    this._setResult = function (state, value) {
      if (_this._state !== States.PENDING) {
        return;
      }

      if (isThenable(value)) {
        value.then(_this._resolve, _this._reject);
        return;
      }

      _this._state = state;
      _this._value = value;

      _this._executeHandlers();
    }; // TODO: FIXME

    /** JSDoc */


    this._attachHandler = function (handler) {
      _this._handlers = _this._handlers.concat(handler);

      _this._executeHandlers();
    };
    /** JSDoc */


    this._executeHandlers = function () {
      if (_this._state === States.PENDING) {
        return;
      }

      var cachedHandlers = _this._handlers.slice();

      _this._handlers = [];
      cachedHandlers.forEach(function (handler) {
        if (handler.done) {
          return;
        }

        if (_this._state === States.RESOLVED) {
          if (handler.onfulfilled) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            handler.onfulfilled(_this._value);
          }
        }

        if (_this._state === States.REJECTED) {
          if (handler.onrejected) {
            handler.onrejected(_this._value);
          }
        }

        handler.done = true;
      });
    };

    try {
      executor(this._resolve, this._reject);
    } catch (e) {
      this._reject(e);
    }
  }
  /** JSDoc */


  SyncPromise.resolve = function (value) {
    return new SyncPromise(function (resolve) {
      resolve(value);
    });
  };
  /** JSDoc */


  SyncPromise.reject = function (reason) {
    return new SyncPromise(function (_, reject) {
      reject(reason);
    });
  };
  /** JSDoc */


  SyncPromise.all = function (collection) {
    return new SyncPromise(function (resolve, reject) {
      if (!Array.isArray(collection)) {
        reject(new TypeError("Promise.all requires an array as input."));
        return;
      }

      if (collection.length === 0) {
        resolve([]);
        return;
      }

      var counter = collection.length;
      var resolvedCollection = [];
      collection.forEach(function (item, index) {
        SyncPromise.resolve(item).then(function (value) {
          resolvedCollection[index] = value;
          counter -= 1;

          if (counter !== 0) {
            return;
          }

          resolve(resolvedCollection);
        }).then(null, reject);
      });
    });
  };
  /** JSDoc */


  SyncPromise.prototype.then = function (_onfulfilled, _onrejected) {
    var _this = this;

    return new SyncPromise(function (resolve, reject) {
      _this._attachHandler({
        done: false,
        onfulfilled: function onfulfilled(result) {
          if (!_onfulfilled) {
            // TODO: ¯\_(ツ)_/¯
            // TODO: FIXME
            resolve(result);
            return;
          }

          try {
            resolve(_onfulfilled(result));
            return;
          } catch (e) {
            reject(e);
            return;
          }
        },
        onrejected: function onrejected(reason) {
          if (!_onrejected) {
            reject(reason);
            return;
          }

          try {
            resolve(_onrejected(reason));
            return;
          } catch (e) {
            reject(e);
            return;
          }
        }
      });
    });
  };
  /** JSDoc */


  SyncPromise.prototype["catch"] = function (onrejected) {
    return this.then(function (val) {
      return val;
    }, onrejected);
  };
  /** JSDoc */


  SyncPromise.prototype["finally"] = function (onfinally) {
    var _this = this;

    return new SyncPromise(function (resolve, reject) {
      var val;
      var isRejected;
      return _this.then(function (value) {
        isRejected = false;
        val = value;

        if (onfinally) {
          onfinally();
        }
      }, function (reason) {
        isRejected = true;
        val = reason;

        if (onfinally) {
          onfinally();
        }
      }).then(function () {
        if (isRejected) {
          reject(val);
          return;
        }

        resolve(val);
      });
    });
  };
  /** JSDoc */


  SyncPromise.prototype.toString = function () {
    return '[object SyncPromise]';
  };

  return SyncPromise;
}();

/***
 * @file Promise链式调用
 */
/** A simple queue that holds promises. */

var PromiseBuffer$1 = function () {
  function PromiseBuffer(_limit) {
    this._limit = _limit;
    /** Internal set of queued Promises */

    this._buffer = [];
  }
  /**
   * Says if the buffer is ready to take more requests
   */


  PromiseBuffer.prototype.isReady = function () {
    return this._limit === undefined || this.length() < this._limit;
  };

  PromiseBuffer.prototype.add = function (task) {
    var _this = this;

    if (!this.isReady()) {
      return SyncPromise$2.reject(new BeidouError$1('Not adding Promise due to buffer limit reached.'));
    }

    if (this._buffer.indexOf(task) === -1) {
      this._buffer.push(task);
    }

    task.then(function () {
      return _this.remove(task);
    }).then(null, function () {
      return _this.remove(task).then(null, function () {// We have to add this catch here otherwise we have an unhandledPromiseRejection
        // because it's a new Promise chain.
      });
    });
    return task;
  };
  /**
   * Remove a promise to the queue.
   *
   * @param task Can be any PromiseLike<T>
   * @returns Removed promise.
   */


  PromiseBuffer.prototype.remove = function (task) {
    var removedTask = this._buffer.splice(this._buffer.indexOf(task), 1)[0];

    return removedTask;
  };
  /**
   * This function returns the number of unresolved promises in the queue.
   */


  PromiseBuffer.prototype.length = function () {
    return this._buffer.length;
  };

  PromiseBuffer.prototype.drain = function (timeout) {
    var _this = this;

    return new SyncPromise$2(function (resolve) {
      var capturedSetTimeout = setTimeout(function () {
        if (timeout && timeout > 0) {
          resolve(false);
        }
      }, timeout);
      SyncPromise$2.all(_this._buffer).then(function () {
        clearTimeout(capturedSetTimeout);
        resolve(true);
      }).then(null, function () {
        resolve(true);
      });
    });
  };

  return PromiseBuffer;
}();

var oldUrlObj = {
  method: '',
  url: ''
};
function repeatCheck$1(method, url) {
  var newUrlObj = {
    method: method,
    url: url
  };
  var isRepeat = objEqual(oldUrlObj, newUrlObj);

  if (!isRepeat) {
    oldUrlObj = __assign({}, newUrlObj);
  }

  return isRepeat;
}

function objEqual(x, y) {
  for (var prop in x) {
    if (y.hasOwnProperty(prop)) {
      if (!(x[prop] === y[prop])) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

/**
 * Holds additional event information. {@link Scope.applyToEvent} will be
 * called by the client before an event will be sent.
 */

var Scope = function () {
  function Scope() {
    /** Flag if notifiying is happening. */
    this._notifyingListeners = false;
    /** Callback for client to receive scope changes. */

    this._scopeListeners = [];
    /** Callback list that will be called after {@link applyToEvent}. */

    this._eventProcessors = [];
    /** Array of breadcrumbs. */

    this._breadcrumbs = [];
    /** Extra */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    this._extra = {};
    /** Contexts */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    this._contexts = {};
  }
  /**
   * Inherit values from the parent scope.
   * @param scope to clone.
   */


  Scope.clone = function (scope) {
    var newScope = new Scope();

    if (scope) {
      newScope._breadcrumbs = __spread(scope._breadcrumbs);
      newScope._extra = __assign({}, scope._extra);
      newScope._contexts = __assign({}, scope._contexts);
      newScope._span = scope._span;
      newScope._transactionName = scope._transactionName;
      newScope._eventProcessors = __spread(scope._eventProcessors);
    }

    return newScope;
  };
  /**
   * Add internal on change listener. Used for sub SDKs that need to store the scope.
   * @hidden
   */


  Scope.prototype.addScopeListener = function (callback) {
    this._scopeListeners.push(callback);
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.addEventProcessor = function (callback) {
    this._eventProcessors.push(callback);

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setTransactionName = function (name) {
    this._transactionName = name;

    this._notifyScopeListeners();

    return this;
  };
  /**
   * Can be removed in major version.
   * @deprecated in favor of {@link this.setTransactionName}
   */


  Scope.prototype.setTransaction = function (name) {
    return this.setTransactionName(name);
  };
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  Scope.prototype.setContext = function (key, context) {
    var _a;

    this._contexts = __assign(__assign({}, this._contexts), (_a = {}, _a[key] = context, _a));

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setSpan = function (span) {
    this._span = span;

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.getSpan = function () {
    return this._span;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.getTransaction = function () {
    var span = this.getSpan();

    if (span && span.spanRecorder && span.spanRecorder.spans[0]) {
      return span.spanRecorder.spans[0];
    }

    return undefined;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.getBreadcrumb = function () {
    return this._breadcrumbs;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.update = function (captureContext) {
    if (!captureContext) {
      return this;
    }

    if (typeof captureContext === 'function') {
      var updatedScope = captureContext(this);
      return updatedScope instanceof Scope ? updatedScope : this;
    }

    if (captureContext instanceof Scope) {
      this._extra = __assign(__assign({}, this._extra), captureContext._extra);
      this._contexts = __assign(__assign({}, this._contexts), captureContext._contexts);
    } else if (isPlainObject$2(captureContext)) {
      // eslint-disable-next-line no-param-reassign
      captureContext = captureContext;
      this._extra = __assign(__assign({}, this._extra), captureContext.extra);
      this._contexts = __assign(__assign({}, this._contexts), captureContext.contexts);
    }

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.clear = function () {
    this._breadcrumbs = [];
    this._extra = {};
    this._contexts = {};
    this._transactionName = undefined;
    this._span = undefined;

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.addBreadcrumb = function (breadcrumb, maxBreadcrumbs) {
    var mergedBreadcrumb = __assign({
      timestamp: timestampWithMs$1()
    }, breadcrumb);

    this._breadcrumbs = maxBreadcrumbs !== undefined && maxBreadcrumbs >= 0 ? __spread(this._breadcrumbs, [mergedBreadcrumb]).slice(-maxBreadcrumbs) : __spread(this._breadcrumbs, [mergedBreadcrumb]);

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.clearBreadcrumbs = function () {
    this._breadcrumbs = [];

    this._notifyScopeListeners();

    return this;
  };
  /**
   * Applies the current context and fingerprint to the event.
   * Note that breadcrumbs will be added by the client.
   * Also if the event has already breadcrumbs on it, we do not merge them.
   * @param event Event
   * @param hint May contain additional informartion about the original exception.
   * @hidden
   */


  Scope.prototype.applyToEvent = function (event, hint) {
    if (this._contexts && Object.keys(this._contexts).length) {
      event.contexts = __assign(__assign({}, this._contexts), event.contexts);
    } // We want to set the trace context for normal events only if there isn't already
    // a trace context on the event. There is a product feature in place where we link
    // errors with transaction and it relys on that.
    // if (this._span && event.type === 'performance') {
    //   event.contexts = { trace: this._span.getTraceContext(), ...event.contexts };
    // }
    // event.breadcrumbs = [...(event.breadcrumbs || []), ...this._breadcrumbs];
    // event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : undefined;


    return this._notifyEventProcessors(__spread(getGlobalEventProcessors(), this._eventProcessors), event, hint);
  };
  /**
   * This will be called after {@link applyToEvent} is finished.
   */


  Scope.prototype._notifyEventProcessors = function (processors, event, hint, index) {
    var _this = this;

    if (index === void 0) {
      index = 0;
    }

    return new SyncPromise$2(function (resolve, reject) {
      var processor = processors[index];

      if (event === null || typeof processor !== 'function') {
        resolve(event);
      } else {
        var result = processor(__assign({}, event), hint);

        if (isThenable(result)) {
          result.then(function (_final) {
            return _this._notifyEventProcessors(processors, _final, hint, index + 1).then(resolve);
          }).then(null, reject);
        } else {
          _this._notifyEventProcessors(processors, result, hint, index + 1).then(resolve).then(null, reject);
        }
      }
    });
  };
  /**
   * This will be called on every set call.
   */


  Scope.prototype._notifyScopeListeners = function () {
    var _this = this;

    if (!this._notifyingListeners) {
      this._notifyingListeners = true;
      setTimeout(function () {
        _this._scopeListeners.forEach(function (callback) {
          callback(_this);
        });

        _this._notifyingListeners = false;
      });
    }
  };

  return Scope;
}();
/**
 * Retruns the global event processors.
 */

function getGlobalEventProcessors() {
  var global = getGlobalObject$1();
  global.__BEIDOU__ = global.__BEIDOU__ || {};
  global.__BEIDOU__.globalEventProcessors = global.__BEIDOU__.globalEventProcessors || [];
  return global.__BEIDOU__.globalEventProcessors;
}
/**
 * Add a EventProcessor to be kept globally.
 * @param callback EventProcessor to add
 */


function addGlobalEventProcessor$1(callback) {
  getGlobalEventProcessors().push(callback);
}

/**
 * 默认添加event最大长度的面包屑。能被覆盖
 * with {@link Options.maxBreadcrumbs}.
 */

var DEFAULT_BREADCRUMBS = 100;
/**
 * 最大的面包屑长度
 */

var MAX_BREADCRUMBS = 100;
/**
 * @inheritDoc
 */

var Hub = function () {
  /**
   * 创建hub的实例，把scope和client实例绑定到_stack上
   *
   * @param client bound to the hub.
   * @param scope bound to the hub.
   */
  function Hub(client, scope) {
    if (scope === void 0) {
      scope = new Scope();
    }
    /** 包含client和scope的实例的堆栈 */


    this._stack = [];

    this._stack.push({
      client: client,
      scope: scope
    });

    this.bindClient(client);
  }
  /**
   * 绑定client到_stack
   */


  Hub.prototype.bindClient = function (client) {
    var top = this.getStackTop();
    top.client = client; // 集成的调用处理

    if (client && client.setupIntegrations) {
      client.setupIntegrations();
    }
  };
  /**
   * scope入栈
   */


  Hub.prototype.pushScope = function () {
    var stack = this.getStack();
    var parentScope = stack.length > 0 ? stack[stack.length - 1].scope : undefined;
    var scope = Scope.clone(parentScope);
    this.getStack().push({
      client: this.getClient(),
      scope: scope
    });
    return scope;
  };
  /**
   * scope出栈
   */


  Hub.prototype.popScope = function () {
    return this.getStack().pop() !== undefined;
  };
  /**
   * 接受scope匿名回调,复制scope不会改变挂载在全局的scope实例
   */


  Hub.prototype.withScope = function (callback) {
    var scope = this.pushScope();

    try {
      callback(scope);
    } finally {
      this.popScope();
    }
  };
  /** 返回顶层的client实例 */


  Hub.prototype.getClient = function () {
    return this.getStackTop().client;
  };
  /** 返回顶层的scope实例 */


  Hub.prototype.getScope = function () {
    return this.getStackTop().scope;
  };
  /** 返回_stack  */


  Hub.prototype.getStack = function () {
    return this._stack;
  };
  /** 返回堆栈最后的stack */


  Hub.prototype.getStackTop = function () {
    return this._stack[this._stack.length - 1];
  };
  /**
   * captureException上报
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types


  Hub.prototype.captureException = function (exception, hint) {
    var eventId = this._lastEventId = uuid4$3();
    var finalHint = hint;

    if (!hint) {
      var syntheticException = void 0;

      try {
        throw new Error('Beidou syntheticException');
      } catch (exception) {
        syntheticException = exception;
      }

      finalHint = {
        originalException: exception,
        syntheticException: syntheticException
      };
    }

    this._invokeClient('captureException', exception, __assign({
      timestamp: Date.now(),
      event_id: eventId
    }, finalHint));

    return eventId;
  };
  /**
   * 一次event上报
   */


  Hub.prototype.captureEvent = function (event, hint) {
    var eventId = this._lastEventId = uuid4$3();

    this._invokeClient('captureEvent', event, __assign({
      timestamp: Date.now(),
      event_id: eventId
    }, hint));

    return eventId;
  };
  /**
   * 获取eventId
   */


  Hub.prototype.lastEventId = function () {
    return this._lastEventId;
  };
  /**
   * @inheritDoc
   * 添加面包屑
   */


  Hub.prototype.addBreadcrumb = function (breadcrumb, hint) {
    var top = this.getStackTop();

    if (!top.scope || !top.client) {
      return;
    } // eslint-disable-next-line @typescript-eslint/unbound-method


    var _a = top.client.getOptions && top.client.getOptions() || {},
        _b = _a.beforeBreadcrumb,
        beforeBreadcrumb = _b === void 0 ? null : _b,
        _c = _a.maxBreadcrumbs,
        maxBreadcrumbs = _c === void 0 ? DEFAULT_BREADCRUMBS : _c;

    if (maxBreadcrumbs <= 0) {
      return;
    }

    var timestamp = timestampWithMs$1();

    var mergedBreadcrumb = __assign({
      timestamp: timestamp
    }, breadcrumb);

    var finalBreadcrumb = beforeBreadcrumb ? consoleSandbox(function () {
      return beforeBreadcrumb(mergedBreadcrumb, hint);
    }) : mergedBreadcrumb;

    if (finalBreadcrumb === null) {
      return;
    }

    top.scope.addBreadcrumb(finalBreadcrumb, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS));
  };
  /**
   * @inheritDoc
   * 获取面包屑
   */


  Hub.prototype.getBreadcrumb = function () {
    var top = this.getStackTop();

    if (!top.scope || !top.client) {
      return [];
    }

    return top.scope.getBreadcrumb();
  };
  /**
   * @inheritDoc
   * 清空面包屑
   */


  Hub.prototype.clearBreadcrumbs = function () {
    var top = this.getStackTop();

    if (!top.scope || !top.client) {
      return;
    }

    top.scope.clearBreadcrumbs();
  }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


  Hub.prototype.setContext = function (name, context) {
    var top = this.getStackTop();

    if (!top.scope) {
      return;
    }

    top.scope.setContext(name, context);
  };
  /**
   * 接受scope的处理回调， 接受scope匿名回调, 会改变挂载在全局的scope实例
   */


  Hub.prototype.configureScope = function (callback) {
    var top = this.getStackTop();

    if (top.scope && top.client) {
      callback(top.scope);
    }
  };
  /**
   * 判断integration是否在初始化被注入
   */


  Hub.prototype.getIntegration = function (integration) {
    var client = this.getClient();

    if (!client) {
      return null;
    }

    try {
      return client.getIntegration(integration);
    } catch (_oO) {
      logger$5.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
      return null;
    }
  };
  /**
   * 性能处理, 待确认
   */


  Hub.prototype.startSpan = function (context) {
    return this._callExtensionMethod('startSpan', context);
  };
  /**
   * 性能处理, 待确认
   */


  Hub.prototype.startTransaction = function (context) {
    return this._callExtensionMethod('startTransaction', context);
  };
  /**
   * clint method具体实现
   *
   * @param method The method to call on the client.
   * @param args Arguments to pass to the client function.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  Hub.prototype._invokeClient = function (method) {
    var _a;

    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var top = this.getStackTop();

    if (top && top.client && top.client[method]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (_a = top.client)[method].apply(_a, __spread(args, [top.scope]));
    }
  };
  /**
   * 全局global extension方法调用
   */
  // @ts-ignore Function lacks ending return statement and return type does not include 'undefined'. ts(2366)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  Hub.prototype._callExtensionMethod = function (method) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var carrier = getMainCarrier();
    var beidou = carrier.__BEIDOU__;

    if (beidou && beidou.extensions && typeof beidou.extensions[method] === 'function') {
      return beidou.extensions[method].apply(this, args);
    }

    logger$5.warn("Extension method " + method + " couldn't be found, doing nothing.");
  };

  return Hub;
}();
/** 返回挂载全局的垫片属性. */

function getMainCarrier() {
  var carrier = getGlobalObject$1();
  carrier.__BEIDOU__ = carrier.__BEIDOU__ || {
    extensions: {},
    hub: undefined
  };
  return carrier;
}
/**
 * 返回挂载的hub实例
 */

function getCurrentHub$a() {
  var registry = getMainCarrier();

  if (!hasHubOnCarrier(registry)) {
    setHubOnCarrier(registry, new Hub());
  }

  return getHubFromCarrier(registry);
}
/**
 * 全局是否挂载hub实例
 * @param carrier object
 */

function hasHubOnCarrier(carrier) {
  if (carrier && carrier.__BEIDOU__ && carrier.__BEIDOU__.hub) {
    return true;
  }

  return false;
}
/**
 * 全局载体挂载hub实例，并且返回一个hub实例
 * @param carrier object
 * @hidden
 */


function getHubFromCarrier(carrier) {
  if (carrier && carrier.__BEIDOU__ && carrier.__BEIDOU__.hub) {
    return carrier.__BEIDOU__.hub;
  }

  carrier.__BEIDOU__ = carrier.__BEIDOU__ || {};
  carrier.__BEIDOU__.hub = new Hub();
  return carrier.__BEIDOU__.hub;
}
/**
 * 在全局挂载属性添加hub实例
 * @param carrier object
 * @param hub Hub
 */

function setHubOnCarrier(carrier, hub) {
  if (!carrier) {
    return false;
  }

  carrier.__BEIDOU__ = carrier.__BEIDOU__ || {};
  carrier.__BEIDOU__.hub = hub;
  return true;
}

/** Event上报类型 */
var EventTypeEnum;

(function (EventTypeEnum) {
  EventTypeEnum["resource"] = "resource";
  EventTypeEnum["resource_success"] = "resource_success";
  EventTypeEnum["api"] = "api";
  EventTypeEnum["api_rate"] = "api_rate";
  EventTypeEnum["api_dyeing"] = "api_dyeing";
  EventTypeEnum["api_success"] = "api_success";
  EventTypeEnum["exception"] = "exception";
  EventTypeEnum["performance"] = "performance";
  EventTypeEnum["hybrid"] = "hybrid";
  EventTypeEnum["dom"] = "dom";
  EventTypeEnum["custom"] = "custom";
  EventTypeEnum["breadcrumb"] = "breadcrumb";
})(EventTypeEnum || (EventTypeEnum = {}));
/** 日志上报类型(普通日志|行为轨迹) */


var LogTypeEnum;

(function (LogTypeEnum) {
  LogTypeEnum["breadcrumb"] = "breadcrumb";
})(LogTypeEnum || (LogTypeEnum = {}));

/** Console logging verbosity for the SDK. */
var LogLevel;

(function (LogLevel) {
  /** No logs will be generated. */
  LogLevel[LogLevel["None"] = 0] = "None";
  /** Only SDK internal errors will be logged. */

  LogLevel[LogLevel["Error"] = 1] = "Error";
  /** Information useful for debugging the SDK will be logged. */

  LogLevel[LogLevel["Debug"] = 2] = "Debug";
  /** All SDK actions will be logged. */

  LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
})(LogLevel || (LogLevel = {}));

/** JSDoc */
// eslint-disable-next-line import/export
var Severity;

(function (Severity) {
  /** JSDoc */
  Severity["Fatal"] = "fatal";
  /** JSDoc */

  Severity["Error"] = "error";
  /** JSDoc */

  Severity["Warning"] = "warning";
  /** JSDoc */

  Severity["Log"] = "log";
  /** JSDoc */

  Severity["Info"] = "info";
  /** JSDoc */

  Severity["Debug"] = "debug";
  /** JSDoc */

  Severity["Critical"] = "critical";
})(Severity || (Severity = {})); // eslint-disable-next-line @typescript-eslint/no-namespace, import/export


(function (Severity) {
  /**
   * Converts a string-based level into a {@link Severity}.
   *
   * @param level string representation of Severity
   * @returns Severity
   */
  function fromString(level) {
    switch (level) {
      case 'debug':
        return Severity.Debug;

      case 'info':
        return Severity.Info;

      case 'warn':
      case 'warning':
        return Severity.Warning;

      case 'error':
        return Severity.Error;

      case 'fatal':
        return Severity.Fatal;

      case 'critical':
        return Severity.Critical;

      case 'log':
      default:
        return Severity.Log;
    }
  }

  Severity.fromString = fromString;
})(Severity || (Severity = {}));

/** The status of an event. */
// eslint-disable-next-line import/export
var Status;

(function (Status) {
  /** The status could not be determined. */
  Status["Unknown"] = "unknown";
  /** The event was skipped due to configuration or callbacks. */

  Status["Skipped"] = "skipped";
  /** The event was sent to Beidou successfully. */

  Status["Success"] = "success";
  /** The client is currently rate limited and will try again later. */

  Status["RateLimit"] = "rate_limit";
  /** The event could not be processed. */

  Status["Invalid"] = "invalid";
  /** A server-side error ocurred during submission. */

  Status["Failed"] = "failed";
})(Status || (Status = {})); // eslint-disable-next-line @typescript-eslint/no-namespace, import/export


(function (Status) {
  /**
   * Converts a HTTP status code into a {@link Status}.
   *
   * @param code The HTTP response status code.
   * @returns The send status or {@link Status.Unknown}.
   */
  function fromHttpCode(code) {
    if (code >= 200 && code < 300) {
      return Status.Success;
    }

    if (code === 429) {
      return Status.RateLimit;
    }

    if (code >= 400 && code < 500) {
      return Status.Invalid;
    }

    if (code >= 500) {
      return Status.Failed;
    }

    return Status.Unknown;
  }

  Status.fromHttpCode = fromHttpCode;
})(Status || (Status = {}));

var installedIntegrations = [];
/** Setup given integration */

function setupIntegration(integration) {
  if (installedIntegrations.indexOf(integration.name) !== -1) {
    return;
  }

  integration.setupOnce(addGlobalEventProcessor$1, getCurrentHub$a);
  installedIntegrations.push(integration.name);
  logger$5.log("Integration installed: " + integration.name);
}
function setupIntegrations(options) {
  var integrations = {};

  if (Array.isArray(options.defaultIntegrations) && options.defaultIntegrations.length) {
    options.defaultIntegrations.forEach(function (integration) {
      integrations[integration.name] = integration;
      setupIntegration(integration);
    });
  }

  return integrations;
}

var DEFAULT_SEND_EVENT = 30; // 默认上报次数

var MAX_ALLOW_SEND_EVENT = 500; // 允许上报的最大次数

var BaseClient = function () {
  /**
   * Initializes this client instance.
   *
   * @param backendClass A constructor function to create the backend.
   * @param options Options for the client.
   */
  function BaseClient(backendClass, options) {
    /** Array of used integrations. */
    this._integrations = {};
    /** Is the client still processing a call? */

    this._processing = false;
    this._backend = new backendClass(options);
    var _a = options.maxSendEvent,
        maxSendEvent = _a === void 0 ? DEFAULT_SEND_EVENT : _a;
    this._max = Math.min(maxSendEvent, MAX_ALLOW_SEND_EVENT);
    this._options = options;
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types


  BaseClient.prototype.captureException = function (exception, hint, scope) {
    var _this = this;

    var eventId = hint && hint.event_id;
    this._processing = true; // eslint-disable-next-line @typescript-eslint/no-floating-promises

    this._getBackend().eventFromException(exception, hint).then(function (event) {
      event.type = EventTypeEnum.exception;
      eventId = _this.captureEvent(event, hint, scope);
    });

    return eventId;
  };

  BaseClient.prototype._devEnvHandle = function () {
    if (isDevHref()) {
      logger$5.warn("\u76D1\u63A7\u4F60\u5728\u672C\u5730\u670D\u52A1\u8FDB\u884C\u5F00\u53D1\uFF0C\u4E0D\u4F1A\u8FDB\u884C\u5317\u6597\u4E0A\u62A5");
      return true; // return false
    }

    return true;
  }; // 上报前策略处理


  BaseClient.prototype._allowSent = function (event) {
    // 面包屑没有参与统计
    if (event.type === 'breadcrumb' || event.type === 'performance') {
      return true;
    }

    if (this._max <= 0) {
      logger$5.warn("\u5F53\u524D\u53D1\u9001\u6B21\u6570\u5DF2\u7ECF\u7528\u5B8C");
      return false;
    }

    logger$5.log("\u5F53\u524D\u5269\u4F59\u53D1\u9001event\u6B21\u6570: " + this._max);
    this._max = this._max - 1;
    return true;
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.captureEvent = function (event, hint, scope) {
    var _this = this;

    var eventId = hint && hint.event_id;
    this._processing = true;

    this._processEvent(event, hint, scope).then(function (finalEvent) {
      // We need to check for finalEvent in case beforeSend returned null
      eventId = finalEvent && finalEvent.event_id;
      _this._processing = false;
    })
    /* @ts-ignore */
    .then(null, function (reason) {
      // TODO: 去掉 logger
      // logger.error(reason);
      _this._processing = false;
    });

    return eventId;
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.getOptions = function () {
    return this._options;
  };
  /**
   * Sets up the integrations
   */


  BaseClient.prototype.setupIntegrations = function () {
    if (this._isEnabled()) {
      this._integrations = setupIntegrations(this._options);
    }
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.getIntegration = function (integration) {
    try {
      return this._integrations[integration.id] || null;
    } catch (_oO) {
      logger$5.warn("Cannot retrieve integration " + integration.id + " from the current Client");
      return null;
    }
  };
  /** Returns the current backend. */


  BaseClient.prototype._getBackend = function () {
    return this._backend;
  };
  /** Determines whether this SDK is enabled. */


  BaseClient.prototype._isEnabled = function () {
    return this.getOptions().enabled !== false;
  };
  /** isProd */


  BaseClient.prototype._isProd = function () {
    return !!this.getOptions().isProd;
  };
  /** isDebug */


  BaseClient.prototype._isDebug = function () {
    return !!this.getOptions().isDebug;
  };
  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A new event with more information.
   */


  BaseClient.prototype._prepareEvent = function (event, scope, hint) {
    var _this = this;

    var _a = this.getOptions().normalizeDepth,
        normalizeDepth = _a === void 0 ? 3 : _a;

    var prepared = __assign({}, event);

    this._applyClientOptions(prepared); // this._applyIntegrationsMetadata(prepared);
    // If we have scope given to us, use it as the base for further modifications.
    // This allows us to prevent unnecessary copying of data if `captureContext` is not provided.


    var finalScope = scope;

    if (hint && hint.captureContext) {
      finalScope = Scope.clone(finalScope).update(hint.captureContext);
    } // We prepare the result here with a resolved Event.


    var result = SyncPromise$2.resolve(prepared); // This should be the last thing called, since we want that
    // {@link Hub.addEventProcessor} gets the finished prepared event.

    if (finalScope) {
      // In case we have a hub we reassign it.
      result = finalScope.applyToEvent(prepared, hint);
    }

    return result.then(function (evt) {
      if (typeof normalizeDepth === 'number' && normalizeDepth > 0) {
        return _this._normalizeEvent(evt, normalizeDepth);
      }

      return evt;
    });
  };
  /**
   * Applies `normalize` function on necessary `Event` attributes to make them safe for serialization.
   * Normalized keys:
   * - `breadcrumbs.data`
   * - `user`
   * - `contexts`
   * - `extra`
   * @param event Event
   * @returns Normalized event
   */


  BaseClient.prototype._normalizeEvent = function (event, depth) {
    if (!event) {
      return null;
    }

    var normalized = __assign(__assign({}, event), event.contexts && {
      contexts: normalize(event.contexts, depth)
    }); // event.contexts.trace stores information about a Transaction. Similarly,
    // event.spans[] stores information about child Spans. Given that a
    // Transaction is conceptually a Span, normalization should apply to both
    // Transactions and Spans consistently.
    // For now the decision is to skip normalization of Transactions and Spans,
    // so this block overwrites the normalized event to add back the original
    // Transaction information prior to normalization.


    if (event.contexts && event.contexts.trace) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      normalized.contexts.trace = event.contexts.trace;
    }

    return normalized;
  };
  /**
   *  Enhances event using the client configuration.
   *  It takes care of all "static" values like environment, release and `dist`,
   *  as well as truncating overly long values.
   * @param event event instance to be enhanced
   */


  BaseClient.prototype._applyClientOptions = function (event) {
    var _a = this.getOptions().maxValueLength,
        maxValueLength = _a === void 0 ? 250 : _a;
    var exception = event.exceptions && event.exceptions[0];

    if (exception && exception.content) {
      exception.content = truncate(exception.content, maxValueLength);
    }

    var request = event.request;

    if (request && request.url) {
      request.url = truncate(request.url, maxValueLength);
    }
  };
  /**
   * Tells the backend to send this event
   * @param event The Beidou event to send
   */


  BaseClient.prototype._sendEvent = function (event) {
    // 这里处理拦截 event已经经过了common的处理
    if (this._isProd() && this._devEnvHandle() && this._allowSent(event)) {
      this._getBackend().sendEvent(event);
    }

    if (this._isDebug()) {
      logger$5.log(JSON.stringify(event, null, 2));
    }
  };
  /**
   * Processes an event (either error or message) and sends it to Beidou.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Beidou.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */


  BaseClient.prototype._processEvent = function (event, hint, scope) {
    var _this = this; // eslint-disable-next-line @typescript-eslint/unbound-method


    var beforeSend = this.getOptions().beforeSend;

    if (!this._isEnabled()) {
      return SyncPromise$2.reject('SDK not enabled, will not send event.');
    }

    return new SyncPromise$2(function (resolve, reject) {
      _this._prepareEvent(event, scope, hint).then(function (prepared) {
        if (prepared === null) {
          reject('An event processor returned null, will not send event.');
          return;
        }

        var finalEvent = prepared;
        var isInternalException = hint && hint.data && hint.data.__beidou__ === true; // We skip beforeSend in case of transactions

        if (isInternalException || !beforeSend) {
          _this._sendEvent(finalEvent);

          resolve(finalEvent);
          return;
        }

        var beforeSendResult = beforeSend(prepared, hint);

        if (typeof beforeSendResult === 'undefined') {
          logger$5.error('`beforeSend` method has to return `null` or a valid event.');
        } else if (isThenable(beforeSendResult)) {
          _this._handleAsyncBeforeSend(beforeSendResult, resolve, reject);
        } else {
          finalEvent = beforeSendResult;

          if (finalEvent === null) {
            logger$5.log('`beforeSend` returned `null`, will not send event.');
            resolve(null);
            return;
          } // From here on we are really async


          _this._sendEvent(finalEvent);

          resolve(finalEvent);
        }
      }).then(null, function (reason) {
        _this.captureException(reason, {
          data: {
            __beidou__: true
          },
          originalException: reason
        });

        reject("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + reason);
      });
    });
  };
  /**
   * Resolves before send Promise and calls resolve/reject on parent SyncPromise.
   */


  BaseClient.prototype._handleAsyncBeforeSend = function (beforeSend, resolve, reject) {
    var _this = this;

    beforeSend.then(function (processedEvent) {
      if (processedEvent === null) {
        reject('`beforeSend` returned `null`, will not send event.');
        return;
      } // From here on we are really async


      _this._sendEvent(processedEvent);

      resolve(processedEvent);
    }).then(null, function (e) {
      reject("beforeSend rejected with " + e);
    });
  };

  return BaseClient;
}();

/** Noop transport */

var NoopTransport = function () {
  function NoopTransport() {}
  /**
   * @inheritDoc
   */


  NoopTransport.prototype.sendEvent = function (_) {
    return SyncPromise$2.resolve({
      reason: "NoopTransport: Event has been skipped",
      status: Status.Skipped
    });
  };
  /**
   * @inheritDoc
   */


  NoopTransport.prototype.close = function (_) {
    return SyncPromise$2.resolve(true);
  };

  return NoopTransport;
}();

/**
 * This is the base implemention of a Backend.
 * @hidden
 */

var BaseBackend = function () {
  /** Creates a new backend instance. */
  function BaseBackend(options) {
    this._options = options;
    this._transport = this._setupTransport();
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types


  BaseBackend.prototype.eventFromException = function (_exception, _hint) {
    throw new BeidouError$1('Backend has to implement `eventFromException` method');
  };
  /**
   * @inheritDoc
   */


  BaseBackend.prototype.eventFromMessage = function (_message, _hint) {
    throw new BeidouError$1('Backend has to implement `eventFromMessage` method');
  };
  /**
   * @inheritDoc
   */


  BaseBackend.prototype.sendEvent = function (event) {
    this._transport.sendEvent(event).then(null, function (reason) {
      logger$5.error("Error while sending event: " + reason);
    });
  };
  /**
   * @inheritDoc
   */


  BaseBackend.prototype.getTransport = function () {
    return this._transport;
  };
  /**
   * Sets up the transport so it can be used later to send requests.
   */


  BaseBackend.prototype._setupTransport = function () {
    return new NoopTransport();
  };

  return BaseBackend;
}();

function initAndBind$1(clientClass, options) {
  // debug 开启
  if (options.isDebug === true) {
    logger$5.enable();
  }

  var hub = getCurrentHub$a();
  var client = new clientClass(options);
  hub.bindClient(client);
}

var PromiseBuffer = PromiseBuffer$1,
    BeidouError = BeidouError$1;
var getCurrentHub$9 = getCurrentHub$a;
/** Base Transport class implementation */

var BaseTransport = function () {
  function BaseTransport() {
    this.url = '';
    /** A simple buffer holding all requests. */

    this._buffer = new PromiseBuffer(30);
  }
  /**
   * @description 返回上报接口链接
   * @returns string
   */


  BaseTransport.prototype._getReportUrl = function () {
    var client = getCurrentHub$9().getClient() || {
      getOptions: function getOptions() {
        return {
          projectId: '',
          url: ''
        };
      }
    };
    var url = client.getOptions().url;
    return url;
  };
  /**
   * @inheritDoc
   */


  BaseTransport.prototype.sendEvent = function (_) {
    throw new BeidouError('Transport Class has to implement `sendEvent` method');
  };
  /**
   * @inheritDoc
   */


  BaseTransport.prototype.close = function (timeout) {
    return this._buffer.drain(timeout);
  };

  BaseTransport.prototype.finalFomartData = function (event) {
    var projectId = event.projectId,
        exceptions = event.exceptions,
        apis = event.apis,
        resources = event.resources,
        performances = event.performances,
        breadcrumbs = event.breadcrumbs,
        type = event.type,
        sdk = event.sdk,
        request = event.request;

    var content = __assign(__assign(__assign(__assign(__assign({
      projectId: projectId,
      type: type,
      sdk: sdk,
      request: request
    }, performances && {
      performances: performances
    }), exceptions && {
      exceptions: exceptions
    }), apis && {
      apis: apis
    }), resources && {
      resources: resources
    }), breadcrumbs && {
      breadcrumbs: breadcrumbs
    });

    if (content.type === 'exception' && content.exceptions && content.exceptions[0] && content.exceptions[0].stacktrace) {
      try {
        content.exceptions[0].stacktrace = JSON.stringify(content.exceptions[0].stacktrace);
      } catch (e) {
        content.exceptions[0].stacktrace = '[]';
      }
    }

    try {
      content = content;
    } catch (e) {
      content = {};
    }

    return content;
  };

  return BaseTransport;
}();

/**
 * 应用级事件 基础库>2.1.2
 * wx.onUnhandledRejection(function callback) -> App.onUnhandledRejection 监听未处理的 Promise 拒绝事件
 * wx.onAppShow -> App.onShow 监听小程序切前台事件
 * wx.onPageNotFound -> App.onPageNotFound 监听小程序要打开的页面不存在事件
 * wx.onError -> App.onError 监听小程序错误事件。如脚本错误或 API 调用报错等
 * wx.onAppHide -> App.onHide 监听小程序切后台事件
 * wx.getLaunchOptionsSync -> App.onLaunch 获取小程序启动时的参数
 */

var APP_LIFE_CYCLE = ['onLaunch', 'onShow'];
var PAGE_LIFE_CYCLE = ['onLoad', 'onShow', 'onReady', 'onHide'];
var mp;

var MP = function () {
  function MP() {}

  Object.defineProperty(MP.prototype, "context", {
    get: function get() {
      if (this._context) return this._context;

      if (typeof wx !== 'undefined') {
        this._context = wx;
      }

      if (typeof swan !== 'undefined') {
        this._context = swan;
      }

      if (typeof tt !== 'undefined') {
        this._context = tt;
      }

      if (typeof my !== 'undefined') {
        this._context = my;
      }

      if (typeof qq !== 'undefined') {
        this._context = qq;
      }

      if (typeof qh !== 'undefined') {
        this._context = qh;
      }

      return this._context;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MP.prototype, "appName", {
    get: function get() {
      if (this._appName) return this._appName;

      if (typeof wx !== 'undefined') {
        this._appName = 'wx';
      }

      if (typeof swan !== 'undefined') {
        this._appName = 'swan';
      }

      if (typeof tt !== 'undefined') {
        this._appName = 'tt';
      }

      if (typeof my !== 'undefined') {
        this._appName = 'my';
      }

      if (typeof qq !== 'undefined') {
        this._appName = 'qq';
      }

      if (typeof qh !== 'undefined') {
        this._appName = 'qh';
      }

      return this._appName;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MP.prototype, "systemInfo", {
    get: function get() {
      if (this._systemInfo) return this._systemInfo;
      this._systemInfo = this._context.getSystemInfoSync();

      if (this._appName === 'my') {
        this._systemInfo.SDKVersion = this._context.SDKVersion || '';
      }

      return this._systemInfo;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MP.prototype, "userInfo", {
    get: function get() {
      var self = this;
      if (this._userInfo) return this._userInfo;

      this._context.getUserInfo({
        success: function success(res) {
          self._userInfo = res.userInfo || {};
        }
      });

      return;
    },
    enumerable: false,
    configurable: true
  });

  MP.prototype.networkInfo = function () {
    return __awaiter(this, void 0, void 0, function () {
      var self;

      var _this = this;

      return __generator(this, function (_a) {
        self = this;
        return [2
        /*return*/
        , new Promise(function (resolve, reject) {
          _this._context.getNetworkType({
            success: function success(res) {
              self._networkInfo = {
                signalStrength: res.signalStrength,
                networkType: res.networkType
              };
              resolve(self._networkInfo);
            },
            fail: function fail(err) {
              reject(err);
            }
          });
        })];
      });
    });
  };

  MP.prototype.getVersionInfo = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , new Promise(function (resolve, reject) {
          try {
            if (typeof wx !== 'undefined') {
              var accountInfo = wx.getAccountInfoSync();
              resolve(accountInfo.miniProgram.version); // 小程序 appId
            }

            if (typeof swan !== 'undefined') {
              var res = swan.getEnvInfoSync(); // 基础库 3.140.1 之前，无法判断接口是否调用失败
              // 基础库 3.140.1 及以后，通过 instanceof 来判断接口是否调用失败

              if (!(res instanceof Error)) {
                resolve(res.env);
              } else {
                reject(res.message);
              }
            }

            if (typeof tt !== 'undefined') {
              var microapp = tt.getEnvInfoSync().microapp;
              resolve(microapp.mpVersion);
            }

            if (typeof my !== 'undefined') {
              my.getRunScene({
                success: function success(result) {
                  resolve(result.envVersion);
                },
                fail: function fail() {
                  reject();
                }
              });
            }

            if (typeof qq !== 'undefined') {
              resolve(qq.getEnvVersion());
            }
          } catch (error) {}
        })];
      });
    });
  };

  Object.defineProperty(MP.prototype, "sceneInfo", {
    get: function get() {
      return this._sceneInfo;
    },
    set: function set(sceneInfo) {
      this._sceneInfo = sceneInfo;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MP.prototype, "indexPage", {
    get: function get() {
      return this._indexPage;
    },
    set: function set(indexPage) {
      this._indexPage = indexPage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MP.prototype, "currentPage", {
    get: function get() {
      if (this.appName === 'qh') {
        var path = $router.history.current.path;
        return path;
      }

      var pages = getCurrentPages();

      if (pages.length > 0) {
        return pages[pages.length - 1].route;
      } else {
        return this._indexPage;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MP.prototype, "pageParams", {
    get: function get() {
      return this._pageParams;
    },
    set: function set(data) {
      this._pageParams = data;
    },
    enumerable: false,
    configurable: true
  });

  MP.instance = function () {
    if (mp) return mp;
    mp = new MP();
    return mp;
  };

  return MP;
}();

var logger$4 = logger$5,
    parseRetryAfterHeader = parseRetryAfterHeader$1;
var getCurrentHub$8 = getCurrentHub$a;
var hub$4 = getCurrentHub$8();

var RequestTransport = function (_super) {
  __extends(RequestTransport, _super);

  function RequestTransport() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._disabledUntil = new Date(Date.now());
    return _this;
  }

  RequestTransport.prototype.sendEvent = function (event) {
    var _this = this;

    var _a, _b;

    var client = getCurrentHub$8().getClient() || {
      getOptions: function getOptions() {
        return {
          projectId: '',
          isDebug: false
        };
      }
    };
    var isDebug = client.getOptions().isDebug;
    var content = this.finalFomartData(event);

    if (isDebug && ((_b = (_a = content === null || content === void 0 ? void 0 : content.request) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.brand) === 'devtools') {
      return Promise.reject({
        event: event,
        reason: "In the current development environment, exceptions are not reported",
        status: -1
      });
    } // 429 Too Many Requests 表示在一定的时间内用户发送了太多的请求，即超出了“频次限制”。


    if (new Date(Date.now()) < this._disabledUntil) {
      return Promise.reject({
        event: event,
        reason: "Transport locked till " + this._disabledUntil + " due to too many requests.",
        status: 429
      });
    }

    var ctx = MP.instance().context;
    this.url = this._getReportUrl();
    return this._buffer.add(new Promise(function (resolve, reject) {
      ctx.request({
        url: _this.url,
        method: 'POST',
        header: {
          'content-type': 'multipart/form-data; boundary=XXX'
        },
        headers: {
          'content-type': 'multipart/form-data; boundary=XXX'
        },
        data: '\r\n--XXX' + '\r\nContent-Disposition: form-data; name="content"' + '\r\n' + '\r\n' + JSON.stringify(content) + '\r\n--XXX',
        success: function success(response) {
          if (content.type === 'breadcrumb') {
            // 行为轨迹上报成功清空缓存
            hub$4.clearBreadcrumbs();
          }

          var status = Status.fromHttpCode(response.status);

          if (status === Status.Success) {
            resolve({
              status: status
            });
            return;
          }

          if (status === Status.RateLimit) {
            var now = Date.now();
            var retryAfterHeader = response.headers.get('Retry-After');
            _this._disabledUntil = new Date(now + parseRetryAfterHeader(now, retryAfterHeader));
            logger$4.warn("Too many requests, backing off till: " + _this._disabledUntil);
          }

          reject(response);
        },
        fail: function fail(error) {
          reject(error);
        }
      });
    }));
  };

  return RequestTransport;
}(BaseTransport);

var getCurrentHub$7 = getCurrentHub$a;
var SyncPromise$1 = SyncPromise$2;
var hub$3 = getCurrentHub$7();

var MiddlewareTransport = function (_super) {
  __extends(MiddlewareTransport, _super);

  function MiddlewareTransport() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MiddlewareTransport.prototype.sendEvent = function (event) {
    var type = event.type,
        _a = event.request,
        request = _a === void 0 ? {} : _a;
    var logType = event.logType || '';
    var _b = request.headers,
        headers = _b === void 0 ? {} : _b;
    var uuid = headers.uuid;

    if (logType === 'breadcrumb') {
      return this._buffer.add(new SyncPromise$1(function (resolve) {
        var eventCopy = __assign({}, event);

        delete eventCopy.projectId;
        delete eventCopy.sdk;
        delete eventCopy.request;
        hub$3.addBreadcrumb(__assign({}, eventCopy));
        resolve();
      }));
    } else {
      if (type === 'reportBreadcrumb') {
        event.type = 'breadcrumb';
        console.log('行为轨迹上报成功：', uuid);
      }

      return new RequestTransport().sendEvent(event);
    }
  };

  return MiddlewareTransport;
}(BaseTransport);

/**
 * This was originally forked from https://github.com/occ/TraceKit, but has since been
 * largely modified and is now maintained as part of Beidou JS SDK.
 */

var UNKNOWN_FUNCTION = '?'; // Chromium based browsers: Chrome, Brave, new Opera, new Edge

var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i; // gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
// generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
// We need this specific case for now because we want no other regex to match.

var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i;
var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/; // Based on our own mapping pattern - https://github.com/getbeidou/beidou/blob/9f08305e09866c8bd6d0c24f5b0aabdd7dd6c59c/src/beidou/lang/javascript/errormapping.py#L83-L108

var reactMinifiedRegexp = /Minified React error #\d+;/i;
/** JSDoc */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types

function computeStackTrace(ex) {
  var stack = null;
  var popSize = 0;

  if (ex) {
    if (typeof ex.framesToPop === 'number') {
      popSize = ex.framesToPop;
    } else if (reactMinifiedRegexp.test(ex.message)) {
      popSize = 1;
    }
  }

  try {
    // This must be tried first because Opera 10 *destroys*
    // its stacktrace property if you try to access the stack
    // property first!!
    stack = computeStackTraceFromStacktraceProp(ex);

    if (stack) {
      return popFrames(stack, popSize);
    }
  } catch (e) {// no-empty
  }

  try {
    stack = computeStackTraceFromStackProp(ex);

    if (stack) {
      return popFrames(stack, popSize);
    }
  } catch (e) {// no-empty
  }

  return {
    message: extractMessage(ex),
    name: ex && ex.name,
    stack: [],
    failed: true
  };
}
/** JSDoc */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, complexity

function computeStackTraceFromStackProp(ex) {
  if (!ex || !ex.stack) {
    return null;
  }

  var stack = [];
  var lines = ex.stack.split('\n');
  var isEval;
  var submatch;
  var parts;
  var element;

  for (var i = 0; i < lines.length; ++i) {
    if (parts = chrome.exec(lines[i])) {
      var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line

      isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line

      if (isEval && (submatch = chromeEval.exec(parts[2]))) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = submatch[1]; // url

        parts[3] = submatch[2]; // line

        parts[4] = submatch[3]; // column
      }

      element = {
        // working with the regexp above is super painful. it is quite a hack, but just stripping the `address at `
        // prefix here seems like the quickest solution for now.
        url: parts[2] && parts[2].indexOf('address at ') === 0 ? parts[2].substr('address at '.length) : parts[2],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: isNative ? [parts[2]] : [],
        line: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
      };
    } else if (parts = winjs.exec(lines[i])) {
      element = {
        url: parts[2],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: [],
        line: +parts[3],
        column: parts[4] ? +parts[4] : null
      };
    } else if (parts = gecko.exec(lines[i])) {
      isEval = parts[3] && parts[3].indexOf(' > eval') > -1;

      if (isEval && (submatch = geckoEval.exec(parts[3]))) {
        // throw out eval line/column and use top-most line number
        parts[1] = parts[1] || "eval";
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = ''; // no column when eval
      } else if (i === 0 && !parts[5] && ex.columnNumber !== void 0) {
        // FireFox uses this awesome columnNumber property for its top frame
        // Also note, Firefox's column number is 0-based and everything else expects 1-based,
        // so adding 1
        // NOTE: this hack doesn't work if top-most frame is eval
        stack[0].column = ex.columnNumber + 1;
      }

      element = {
        url: parts[3],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: parts[2] ? parts[2].split(',') : [],
        line: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
      };
    } else {
      continue;
    }

    if (!element.func && element.line) {
      element.func = UNKNOWN_FUNCTION;
    }

    stack.push(element);
  }

  if (!stack.length) {
    return null;
  }

  return {
    message: extractMessage(ex),
    name: ex.name,
    stack: stack
  };
}
/** JSDoc */
// eslint-disable-next-line @typescript-eslint/no-explicit-any


function computeStackTraceFromStacktraceProp(ex) {
  if (!ex || !ex.stacktrace) {
    return null;
  } // Access and store the stacktrace property before doing ANYTHING
  // else to it because Opera is not very good at providing it
  // reliably in other circumstances.


  var stacktrace = ex.stacktrace;
  var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
  var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i;
  var lines = stacktrace.split('\n');
  var stack = [];
  var parts;

  for (var line = 0; line < lines.length; line += 2) {
    var element = null;

    if (parts = opera10Regex.exec(lines[line])) {
      element = {
        url: parts[2],
        func: parts[3],
        args: [],
        line: +parts[1],
        column: null
      };
    } else if (parts = opera11Regex.exec(lines[line])) {
      element = {
        url: parts[6],
        func: parts[3] || parts[4],
        args: parts[5] ? parts[5].split(',') : [],
        line: +parts[1],
        column: +parts[2]
      };
    }

    if (element) {
      if (!element.func && element.line) {
        element.func = UNKNOWN_FUNCTION;
      }

      stack.push(element);
    }
  }

  if (!stack.length) {
    return null;
  }

  return {
    message: extractMessage(ex),
    name: ex.name,
    stack: stack
  };
}
/** Remove N number of frames from the stack */


function popFrames(stacktrace, popSize) {
  try {
    return __assign(__assign({}, stacktrace), {
      stack: stacktrace.stack.slice(popSize)
    });
  } catch (e) {
    return stacktrace;
  }
}
/**
 * There are cases where stacktrace.message is an Event object
 * https://github.com/getbeidou/beidou-javascript/issues/1949
 * In this specific case we try to extract stacktrace.message.error.message
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any


function extractMessage(ex) {
  var message = ex && ex.message;

  if (!message) {
    return 'No error message';
  }

  if (message.error && typeof message.error.message === 'string') {
    return message.error.message;
  }

  return message;
}

var extractExceptionKeysForMessage = extractExceptionKeysForMessage$1,
    isEvent$1 = isEvent$2;
var STACKTRACE_LIMIT = 50;
/**
 * This function creates an exception from an TraceKitStackTrace
 * @param stacktrace TraceKitStackTrace that will be converted to an exception
 * @hidden
 */

function exceptionFromStacktrace(stacktrace) {
  var frames = prepareFramesForEvent(stacktrace.stack);
  var type = stacktrace.name;
  var value = stacktrace.message;
  var exception = {
    content: type + ":" + value
  };

  if (frames && frames.length) {
    exception.stacktrace = frames;
  }

  if (type === undefined && value === '') {
    exception.content = 'Unrecoverable error caught';
  }

  return exception;
}
/**
 * @hidden
 */

function eventFromPlainObject(exception, syntheticException, rejection) {
  var type = isEvent$1(exception) ? exception.constructor.name : rejection ? 'UnhandledRejection' : 'Error';
  var value = "Non-Error " + (rejection ? 'promise rejection' : 'exception') + " captured with keys is " + extractExceptionKeysForMessage(exception);
  var event = {
    exceptions: [{
      content: type + ":" + value
    }]
  };

  if (syntheticException) {
    var stacktrace = computeStackTrace(syntheticException);
    var frames_1 = prepareFramesForEvent(stacktrace.stack);
    event.stacktrace = {
      frames: frames_1
    };
  }

  return event;
}
/**
 * @hidden
 */

function eventFromStacktrace(stacktrace) {
  var exceptions = exceptionFromStacktrace(stacktrace);
  return {
    exceptions: [exceptions]
  };
}
/**
 * @hidden
 */

function prepareFramesForEvent(stack) {
  if (!stack || !stack.length) {
    return [];
  }

  var localStack = stack;
  var firstFrameFunction = localStack[0].func || '';
  var lastFrameFunction = localStack[localStack.length - 1].func || ''; // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)

  if (firstFrameFunction.indexOf('captureMessage') !== -1 || firstFrameFunction.indexOf('captureException') !== -1) {
    localStack = localStack.slice(1);
  } // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)


  if (lastFrameFunction.indexOf('beidouWrapped') !== -1) {
    localStack = localStack.slice(0, -1);
  } // The frame where the crash happened, should be the last entry in the array


  return localStack.slice(0, STACKTRACE_LIMIT).map(function (frame) {
    return {
      colno: frame.column === null ? undefined : frame.column,
      filename: frame.url || localStack[0].url,
      "function": frame.func || '?',
      lineno: frame.line === null ? undefined : frame.line
    };
  }).reverse();
}

var addExceptionMechanism = addExceptionMechanism$1,
    addExceptionTypeValue = addExceptionTypeValue$1,
    isDOMError = isDOMError$1,
    isDOMException = isDOMException$1,
    isError = isError$1,
    isErrorEvent = isErrorEvent$1,
    isEvent = isEvent$2,
    isPlainObject$1 = isPlainObject$2,
    SyncPromise = SyncPromise$2;
/**
 * Builds and Event from a Exception
 * @hidden
 */

function eventFromException(options, exception, hint) {
  var syntheticException = hint && hint.syntheticException || undefined;
  var event = eventFromUnknownInput(exception, syntheticException, {
    attachStacktrace: options.attachStacktrace
  });
  return SyncPromise.resolve(event);
}
/**
 * @hidden
 */

function eventFromUnknownInput(exception, syntheticException, options) {
  if (options === void 0) {
    options = {};
  }

  var event;

  if (isErrorEvent(exception) && exception.error) {
    // If it is an ErrorEvent with `error` property, extract it to get actual Error
    var errorEvent = exception; // eslint-disable-next-line no-param-reassign

    exception = errorEvent.error;
    event = eventFromStacktrace(computeStackTrace(exception));
    return event;
  }

  if (isDOMError(exception) || isDOMException(exception)) {
    // If it is a DOMError or DOMException (which are legacy APIs, but still supported in some browsers)
    // then we just extract the name and message, as they don't provide anything else
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
    var domException = exception;
    var name_1 = domException.name || (isDOMError(domException) ? 'DOMError' : 'DOMException');
    var message = domException.message ? name_1 + ": " + domException.message : name_1;
    event = eventFromString(message, syntheticException, options);
    addExceptionTypeValue(event, message);
    return event;
  }

  if (isError(exception)) {
    // we have a real Error object, do nothing
    event = eventFromStacktrace(computeStackTrace(exception));
    return event;
  }

  if (isPlainObject$1(exception) || isEvent(exception)) {
    // If it is plain Object or Event, serialize it manually and extract options
    // This will allow us to group events based on top-level keys
    // which is much better than creating new group when any key/value change
    var objectException = exception;
    event = eventFromPlainObject(objectException, syntheticException, options.rejection); // addExceptionMechanism(event, {
    //   synthetic: true,
    // });

    return event;
  } // If none of previous checks were valid, then it means that it's not:
  // - an instance of DOMError
  // - an instance of DOMException
  // - an instance of Event
  // - an instance of Error
  // - a valid ErrorEvent (one with an error property)
  // - a plain Object
  //
  // So bail out and capture it as a simple message:


  event = eventFromString(exception, syntheticException, options);
  addExceptionTypeValue(event, "" + exception, undefined);
  addExceptionMechanism(event, {
    synthetic: true
  });
  return event;
}
/**
 * @hidden
 */

function eventFromString(input, syntheticException, options) {
  if (options === void 0) {
    options = {};
  }

  var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
  var name;
  var message = input;
  var groups = input.match(ERROR_TYPES_RE);

  if (groups) {
    name = groups[1];
    message = groups[2];
  }

  var exceptions = {
    content: (name || 'Error') + ":" + message
  };

  if (options.attachStacktrace && syntheticException) {
    var stacktrace = computeStackTrace(syntheticException);
    exceptions.stacktrace = prepareFramesForEvent(stacktrace.stack);
  }

  return {
    exceptions: [exceptions]
  };
}

var MiniProgramBackend = function (_super) {
  __extends(MiniProgramBackend, _super);

  function MiniProgramBackend(_options) {
    var _this = _super.call(this, _options) || this;

    _this._options = _options;
    _this.options = _options;
    return _this;
  }
  /**
   * @inheritDoc
   */


  MiniProgramBackend.prototype.eventFromException = function (exception, hint) {
    return eventFromException(this.options, exception, hint);
  };
  /**
   * 上报异常不通过 logger.error 输出
   * 小程序拦截了 console.error
   * 避免上报死循环
   * @param event
   */


  MiniProgramBackend.prototype.sendEvent = function (event) {
    this._transport.sendEvent(event).then(null, function (reason) {
      console.warn("Error while sending event: " + reason);
    });
  };
  /**
   * @inheritDoc
   */


  MiniProgramBackend.prototype._setupTransport = function () {
    return new MiddlewareTransport();
  };

  return MiniProgramBackend;
}(BaseBackend);

var MiniProgramClient = function (_super) {
  __extends(MiniProgramClient, _super);
  /**
   *
   * @param options ReactNativeOptions
   */


  function MiniProgramClient(options) {
    if (options === void 0) {
      options = {};
    }

    return _super.call(this, MiniProgramBackend, options) || this;
  }

  return MiniProgramClient;
}(BaseClient);

var SDK_NAME = 'mp-monitor';
var SDK_VERSION = '1.0.1';

var uuid4$2 = uuid4$3,
    logger$3 = logger$5;
var getCurrentHub$6 = getCurrentHub$a,
    addGlobalEventProcessor = addGlobalEventProcessor$1;
var uuid;

function singleUUID() {
  if (uuid) return uuid;
  return uuid = uuid4$2();
}

function parseData(data) {
  if (data === void 0) {
    data = [];
  }

  return data.map(function (item) {
    return __assign(__assign({
      eventId: uuid4$2()
    }, item), {
      timestamp: Date.now()
    });
  });
}

var Common = function () {
  function Common() {
    var _this = this;
    /**
     * @inheritDoc
     */


    this.name = Common.id;
    /**
     * @inheritDoc
     */

    this.setupOnce = function () {
      var client = getCurrentHub$6().getClient() || {
        getOptions: function getOptions() {
          return {
            projectId: ''
          };
        }
      };
      var projectId = client.getOptions().projectId;
      addGlobalEventProcessor(function (event) {
        return __awaiter(_this, void 0, void 0, function () {
          var mpInstance, systemInfo, networkInfo, sceneInfo, userInfo, pageParams;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2,, 3]);

                event.projectId = projectId;
                event.sdk = {
                  name: SDK_NAME,
                  version: SDK_VERSION
                };
                mpInstance = MP.instance();
                systemInfo = mpInstance.systemInfo || '';
                return [4
                /*yield*/
                , mpInstance.networkInfo()];

              case 1:
                networkInfo = _a.sent() || '';
                sceneInfo = mpInstance.sceneInfo || {};
                userInfo = mpInstance.userInfo || '';
                pageParams = mpInstance.pageParams || {};

                if (mpInstance.currentPage === pageParams.url) {
                  sceneInfo = Object.assign(sceneInfo, {
                    pageParams: pageParams
                  });
                }

                event.request = {
                  url: mpInstance.currentPage,
                  headers: {
                    appName: mpInstance.appName,
                    appVersion: systemInfo.version,
                    appSDKVersion: systemInfo.SDKVersion,
                    imei: singleUUID(),
                    uuid: singleUUID(),
                    pid: singleUUID(),
                    os: systemInfo.system.split(' ')[0],
                    osv: systemInfo.system.split(' ')[1],
                    device: systemInfo.model,
                    brand: systemInfo.brand,
                    benchmarkLevel: systemInfo.benchmarkLevel,
                    host: systemInfo.host,
                    apn: networkInfo !== '' ? networkInfo.networkType : '',
                    scene: sceneInfo !== '' ? JSON.stringify(sceneInfo.scene) : '',
                    systemInfo: encodeURIComponent(JSON.stringify(systemInfo)),
                    userInfo: encodeURIComponent(JSON.stringify(userInfo)),
                    networkInfo: encodeURIComponent(JSON.stringify(networkInfo)),
                    sceneInfo: encodeURIComponent(JSON.stringify(sceneInfo))
                  }
                };
                event.apis && (event.apis = parseData(event.apis));
                event.resources && (event.resources = parseData(event.resources));
                event.performances && (event.performances = parseData(event.performances));
                event.exceptions && (event.exceptions = parseData(event.exceptions));
                return [3
                /*break*/
                , 3];

              case 2:
                _a.sent();
                logger$3.warn('get commom error ');
                return [3
                /*break*/
                , 3];

              case 3:
                return [2
                /*return*/
                , event];
            }
          });
        });
      });
    };
  }
  /**
  * @inheritDoc
  */


  Common.id = 'Common';
  return Common;
}();

var logger$2 = logger$5,
    getFunctionName = getFunctionName$1,
    intercept = intercept$1;
var handlers = {};
var instrumented = {};
/** Instruments given API */

function instrument(type) {
  var ctx = MP.instance().context;

  if (instrumented[type]) {
    return;
  }

  instrumented[type] = true;

  switch (type) {
    case 'request':
      instrumentRequest(ctx);
      break;

    case 'resource':
      instrumentResource(ctx);
      break;

    case 'error':
      instrumentConsoleError();
      break;

    default:
      logger$2.warn('unknown instrumentation type:', type);
  }
}
/**
 * Add handler that will be called when given type of instrumentation triggers.
 * Use at your own risk, this might break without changelog notice, only used internally.
 * @hidden
 */


function addInstrumentationHandler(handler) {
  if (!handler || typeof handler.type !== 'string' || typeof handler.callback !== 'function') {
    return;
  }

  handlers[handler.type] = handlers[handler.type] || [];
  handlers[handler.type].push(handler.callback);
  instrument(handler.type);
}
/** JSDoc */

function triggerHandlers(type, data) {
  var e_1, _a;

  if (!type || !handlers[type]) {
    return;
  }

  try {
    for (var _b = __values(handlers[type] || []), _c = _b.next(); !_c.done; _c = _b.next()) {
      var handler = _c.value;

      try {
        handler(data);
      } catch (e) {
        logger$2.error("Error while triggering instrumentation handler.\nType: " + type + "\nName: " + getFunctionName(handler) + "\nError: " + e);
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
}
/** JSDoc */


function instrumentRequest(ctx) {
  intercept(ctx, 'request', function (originalRequest) {
    return function (requestOptions) {
      var commonHandlerData = __assign(__assign({}, requestOptions), {
        startTimestamp: Date.now()
      });

      var originSuccess = requestOptions.success;
      var originFail = requestOptions.fail;

      requestOptions.success = function (response) {
        if (originSuccess) {
          originSuccess(response);
        }

        triggerHandlers('request', __assign(__assign({}, commonHandlerData), {
          endTimestamp: Date.now(),
          response: response
        }));
      };

      requestOptions.fail = function (error) {
        if (originFail) {
          originFail(error);
        }

        triggerHandlers('request', __assign(__assign({}, commonHandlerData), {
          endTimestamp: Date.now(),
          error: error
        }));
      };

      return originalRequest.call(ctx, requestOptions);
    };
  });
}
/** JSDoc */


function instrumentConsoleError() {
  intercept(window.console, 'error', function (originalConsole) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      triggerHandlers('error', __assign({}, args));
      return originalConsole.call.apply(originalConsole, __spread([window.console], args));
    };
  });
}
/** JSDoc */


function instrumentResource(ctx) {
  intercept(ctx, 'downloadFile', function (originalDownload) {
    return function (downloadOptions) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      var originSuccess = downloadOptions.success;
      var originFail = downloadOptions.fail;
      var startTimestamp = Date.now();

      downloadOptions.success = function (res) {
        if (originSuccess) {
          originSuccess(res);
        }

        if (res.statusCode !== 200) {
          triggerHandlers('resource', {
            statusCode: res.statusCode,
            errMsg: res.errMsg,
            startTimestamp: startTimestamp,
            endTimestamp: Date.now(),
            url: downloadOptions.url || ''
          });
        }
      };

      downloadOptions.fail = function (error) {
        if (originFail) {
          originFail(error);
        }

        triggerHandlers('resource', {
          statusCode: -1,
          errMsg: error.errMsg,
          startTimestamp: startTimestamp,
          endTimestamp: Date.now(),
          url: downloadOptions.url || ''
        });
      };

      return originalDownload.call(ctx, downloadOptions);
    };
  });
}

var uuid4$1 = uuid4$3,
    getGlobalObject = getGlobalObject$1,
    repeatCheck = repeatCheck$1,
    isString = isString$1;
var getCurrentHub$5 = getCurrentHub$a;
var hub$2 = getCurrentHub$5();
var global$1 = getGlobalObject();
var overtime = 10000;
/**
 * @hidden
 */

/**
 * Default APIError instrumentations
 * TODO: Deprecated - with v6, this will be renamed to `Instrument`
 */

var ApiError = function () {
  function ApiError() {
    var _this = this;
    /**
     * @inheritDoc
     */


    this.name = ApiError.id;
    /**
     * Create a api of `beidou` from the events themselves
     */

    this.setupOnce = function () {
      addInstrumentationHandler({
        callback: _this._fetchApi,
        type: 'request'
      });
    };
    /**
     * Creates api from XHR API calls
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any


    this._fetchApi = function (handlerData) {
      var _a, _b; // 已经请求过了


      if (!handlerData.endTimestamp) return;
      if (!handlerData.response) handlerData.response = {
        statusCode: -1
      }; // 处理重复请求

      if (repeatCheck(handlerData.method, handlerData.url)) return;
      var apiVal = {
        category: 'xhr',
        method: isString(handlerData.method) ? handlerData.method.toUpperCase() : 'GET',
        url: _this._formatUrl(handlerData.url),
        statusCode: (_a = handlerData === null || handlerData === void 0 ? void 0 : handlerData.response) === null || _a === void 0 ? void 0 : _a.statusCode,
        errMsg: encodeURIComponent(JSON.stringify((_b = handlerData === null || handlerData === void 0 ? void 0 : handlerData.error) === null || _b === void 0 ? void 0 : _b.errMsg)),
        eventId: uuid4$1(),
        timestamp: Date.now()
      };
      var payload = {
        apis: [apiVal],
        type: 'api'
      };
      /**
      * 根因分析：如果开启行为轨迹采集 & 高频异常主动上报行为轨迹日志
      */
      // const client: any = getCurrentHub().getClient()
      // const options = client?.getOptions();
      // if (options && options.reportBreadcrumb) {
      //   let status = Status.fromHttpCode(handlerData.response.statusCode);
      //   if (status === Status.Success && handlerData.url.includes('/common')) {
      //     let { result = '' } = handlerData.response.data;
      //     if (result) {
      //       const ctx = MP.instance().context;
      //       ctx.reportBreadcrumb();
      //     }
      //   }
      // }
      // if (handlerData.url.match(/newBehavior/)) {
      //   // @ts-ignore 上报成功清空面包屑 
      //   hub.clearBreadcrumbs();
      // }

      if (handlerData.response.statusCode >= 400) {
        hub$2.captureEvent(__assign({}, payload));
      } else if (handlerData.response.statusCode === -1) {
        hub$2.captureEvent(__assign({}, payload));
      }

      _this._handleOvertime(handlerData, payload);
    }; // 处理超时情况


    this._handleOvertime = function (handlerData, payload) {
      if (handlerData && handlerData.endTimestamp - handlerData.startTimestamp > overtime) {
        payload.apis[0].statusCode = 408;
        hub$2.captureEvent(__assign({}, payload));
      }
    }; // 补全url


    this._formatUrl = function (url) {
      try {
        var _url = new global$1.URL(url, global$1.origin);

        return _url.href;
      } catch (e) {
        return url;
      }
    };
  }
  /**
  * @inheritDoc
  */


  ApiError.id = 'APIErrorIntegration';
  return ApiError;
}();

var getCurrentHub$4 = getCurrentHub$a;
var uuid4 = uuid4$3;
var hub$1 = getCurrentHub$4();

var ResourceErrorIntegration = function () {
  function ResourceErrorIntegration() {
    /**
     * @inheritDoc
     */
    this.name = ResourceErrorIntegration.id;

    this._handleDownLoadOnError = function (handlerData) {
      var resourcesVal = {
        url: handlerData.url,
        category: 'downloadFile',
        errMsg: handlerData.errMsg,
        eventId: uuid4(),
        statusCode: handlerData.statusCode || '',
        timestamp: Date.now()
      };
      var payload = {
        resources: [resourcesVal],
        type: 'resource'
      };
      hub$1.captureEvent(__assign({}, payload));
    };
  }
  /**
     * @inheritDoc
     */


  ResourceErrorIntegration.prototype.setupOnce = function () {
    addInstrumentationHandler({
      callback: this._handleDownLoadOnError,
      type: 'resource'
    });
  };
  /**
    * @inheritDoc
    */


  ResourceErrorIntegration.id = 'ResourceErrorIntegration';
  return ResourceErrorIntegration;
}();

var getCurrentHub$3 = getCurrentHub$a;
var hub = getCurrentHub$3();

var GlobalHandlers = function () {
  function GlobalHandlers() {
    /**
     * @inheritDoc
     */
    this.name = GlobalHandlers.id;
    /** JSDoc */

    this._onErrorHandlerInstalled = false;
  }
  /**
   * @inheritDoc
   */


  GlobalHandlers.prototype.setupOnce = function () {
    this._installGlobalOnErrorHandler();
  };

  GlobalHandlers.prototype._installGlobalOnErrorHandler = function () {
    if (this._onErrorHandlerInstalled) {
      return;
    }

    var mp = MP.instance();
    addInstrumentationHandler({
      callback: function callback(args) {
        if (args === void 0) {
          args = [''];
        }

        var content = '',
            stack,
            errType = '';
        var ERROR_TYPES_REG = /(((Eval|Reference|Range|Internal|Type|Syntax)Error)|promise)/;

        if (mp.appName === 'swan' && Object.prototype.toString.call(args[0]) === '[object String]') {
          var errDate = args[0].replace(/\n/g, ">>").split('>>');
          content = errDate[1];
          errType = errDate.splice(0, 4).join('').match(ERROR_TYPES_REG)[0];
        } else {
          for (var i = 0; i < 3; i++) {
            if (args[i]) {
              if (Object.prototype.toString.call(args[i]) === '[object Error]') {
                errType = args[i].name;
                content = args[i].message.replace(/\n/g, " ");
                stack = args[i].stack;
                break;
              } else if (_typeof(args[i]) === 'object') {
                content += JSON.stringify(args[i]);
              } else {
                content += args[i].toString();
              }
            }
          }

          if (!errType) {
            var matchType = content.match(ERROR_TYPES_REG);

            if (matchType && matchType.length > 0) {
              errType = matchType[0] === 'promise' ? 'UnhandledRejection' : matchType[0];
            } else {
              errType = 'Error';
            }
          }
        }

        var exceptionVal = {
          errType: errType,
          content: errType + ": " + content,
          stacktrace: stack || args[0]
        };
        var payload = {
          exceptions: [exceptionVal],
          type: 'exception'
        };
        hub.captureEvent(__assign({}, payload)); // 同时上报行为轨迹

        var event = {
          exceptions: [{
            content: errType,
            contents: errType + ": " + content,
            stacktrace: stack || args[0],
            endTimestamp: Date.now(),
            startTimestamp: Date.now()
          }],
          type: 'exception',
          logType: 'breadcrumb'
        };
        hub.captureEvent(event);
      },
      type: 'error'
    });
    this._onErrorHandlerInstalled = true;
  };
  /**
   * @inheritDoc
   */


  GlobalHandlers.id = 'GlobalHandlersIntegration';
  return GlobalHandlers;
}();

/**
 * @file 常量定义
 * * */
// 定义span的最大个数
var DEFAULT_MAX_SPAN = 100; // 定义性能span的最大个数

var DEFAULT_NAVIGATION_NAME = '__beidou_pageload'; // 定义性能统计tracing名

var timelineStructure = [{
  description: 'SPAN0',
  startTimestamp: 'in',
  endTimestamp: 'App_onLaunch'
}, {
  description: 'SPAN1',
  startTimestamp: 'App_onLaunch',
  endTimestamp: 'App_onShow'
}, {
  description: 'SPAN2',
  startTimestamp: 'Page_init',
  endTimestamp: 'Page_onLoad'
}, {
  description: 'SPAN3',
  startTimestamp: 'Page_onLoad',
  endTimestamp: 'Page_onShow'
}, {
  description: 'SPAN4',
  startTimestamp: 'Page_onShow',
  endTimestamp: 'Page_onReady'
}];

var timestampWithMs = timestampWithMs$1,
    isPlainObject = isPlainObject$2;
/**
 * Keeps track of finished spans for a given transaction
 * @internal
 * @hideconstructor
 * @hidden
 */

var SpanRecorder = function () {
  function SpanRecorder() {
    this.spans = [];
  }

  SpanRecorder.prototype.add = function (span) {
    if (this.spans.length > DEFAULT_MAX_SPAN) {
      delete span.spanRecorder;
    } else {
      this.spans.push(span);
    }
  };

  return SpanRecorder;
}();
/**
 * Span contains all data about a span
 */

var Span = function () {
  function Span(spanContext) {
    this.startTimestamp = timestampWithMs();
    this.pageContexts = [];

    if (!spanContext || !isPlainObject(spanContext)) {
      return this;
    } // span标示


    if (spanContext.description) {
      this.description = spanContext.description;
    } // span开始时间


    if (typeof spanContext.startTimestamp !== 'undefined') {
      this.startTimestamp = spanContext.startTimestamp;
    } // span结束时间


    if (typeof spanContext.endTimestamp !== 'undefined') {
      this.endTimestamp = spanContext.endTimestamp;
    }
  }

  Span.prototype.addPageContext = function (ctx) {
    this.pageContexts.push(ctx);
  };
  /**
   * @inheritDoc
   * @deprecated
   */


  Span.prototype.child = function (spanContext) {
    return this.startChild(spanContext);
  };
  /**
   * @inheritDoc
   */


  Span.prototype.startChild = function (spanContext) {
    var span = new Span(__assign({}, spanContext));
    span.spanRecorder = this.spanRecorder;

    if (span.spanRecorder) {
      span.spanRecorder.add(span);
    }

    return span;
  };
  /**
   * @inheritDoc
   */


  Span.prototype.finish = function (endTimestamp) {
    this.endTimestamp = typeof endTimestamp === 'number' ? endTimestamp : timestampWithMs();
  };

  return Span;
}();

var isInstanceOf = isInstanceOf$1,
    logger$1 = logger$5;
var getCurrentHub$2 = getCurrentHub$a; // @ts-ignore

var instance = null;

var Transaction = function (_super) {
  __extends(Transaction, _super);

  function Transaction(transactionContext, hub) {
    var _this = _super.call(this, transactionContext) || this;

    _this._hub = getCurrentHub$2();

    if (isInstanceOf(hub, Hub)) {
      _this._hub = hub;
    }

    if (transactionContext.name) {
      _this.name = transactionContext.name;
    }

    return _this;
  }
  /**
   * JSDoc
   */


  Transaction.prototype.setName = function (name) {
    this.name = name;
  };
  /**
   * Attaches SpanRecorder to the span itself
   * @param maxlen maximum number of spans that can be recorded
   */


  Transaction.prototype.initSpanRecorder = function () {
    if (!this.spanRecorder) {
      this.spanRecorder = new SpanRecorder();
    }

    this.spanRecorder.add(this);
  };
  /**
   * @inheritDoc
   */


  Transaction.prototype.finish = function (endTimestamp) {
    var _this = this;

    if (!this.name) {
      logger$1.warn('Transaction has no name, falling back to `<unlabeled transaction>`.');
      this.name = '<unlabeled transaction>';
    }

    _super.prototype.finish.call(this, endTimestamp);

    var finishedSpans = this.spanRecorder ? this.spanRecorder.spans.filter(function (s) {
      return s !== _this && s.endTimestamp;
    }) : []; // 上报数据格式和字段处理

    var _finishedSpans = finishedSpans.map(function (span) {
      return {
        description: span.description,
        endTimestamp: span.endTimestamp,
        startTimestamp: span.startTimestamp
      };
    });

    this._hub.captureEvent({
      performances: [{
        contexts: this.pageContexts,
        spans: _finishedSpans
      }],
      type: 'performance'
    }); // 上报成功后重制性能计算时间轴


    this.pageContexts = [];
    this.spanRecorder = new SpanRecorder();
  };

  Transaction.instance = function (ctx, hub) {
    if (instance) return instance;
    instance = new Transaction(ctx, hub);
    return instance;
  };

  return Transaction;
}(Span);

/**
 * @file 性能明细
 **/
function _startChild(transaction, _a) {
  var startTimestamp = _a.startTimestamp,
      ctx = __rest(_a, ["startTimestamp"]);

  if (startTimestamp && transaction.startTimestamp > startTimestamp) {
    transaction.startTimestamp = startTimestamp;
  }

  return transaction.startChild(__assign({
    startTimestamp: startTimestamp
  }, ctx));
}
function addNavigationSpans(transaction, beidouTimeLine) {
  timelineStructure.forEach(function (structure) {
    _startChild(transaction, {
      description: structure.description,
      startTimestamp: beidouTimeLine[structure.startTimestamp],
      endTimestamp: beidouTimeLine[structure.endTimestamp]
    });
  });
}

function addAppContexts(transaction, beidouTimeLine) {
  transaction.addPageContext({
    description: 'READY0',
    time: beidouTimeLine.ready - beidouTimeLine["in"],
    extra: encodeURIComponent(JSON.stringify(beidouTimeLine.AppLaunch.extra))
  });
}

var vitals = null;
var getCurrentHub$1 = getCurrentHub$a;

var MPVitals = function () {
  function MPVitals() {
    var _this = this;

    this.interceptApp = function () {
      var self = _this;
      var mpInstance = MP.instance();
      var primaryApp = App;

      App = function App(obj) {
        APP_LIFE_CYCLE.forEach(function (name) {
          var primaryHookFn = obj[name];

          obj[name] = function (info) {
            if (!mpInstance.indexPage) {
              mpInstance.indexPage = info.path;
              mpInstance.networkInfo;
              mpInstance.userInfo;
            }

            var date = Date.now() || new Date().getTime();
            console.log("App\uFF1A" + name + "_" + date);
            self.__TIMELINE__["App_" + name] = date;

            if (name === 'onLaunch') {
              self._appLanch = {
                layoutTime: date,
                extra: {
                  name: '首屏时间',
                  scene: info.scene
                }
              };
              mpInstance.sceneInfo = info;
              mpInstance.getVersionInfo().then(function (res) {
                mpInstance.sceneInfo = Object.assign(mpInstance.sceneInfo, {
                  mpVersion: res
                });
              });
            }

            if (name === 'onShow') {
              self.__TIMELINE__['Page_init'] = date;
            }

            return primaryHookFn && primaryHookFn.call(this, info);
          };
        });
        primaryApp && primaryApp.call(_this, obj);
      };
    };

    this.interceptPage = function () {
      var self = _this;
      var isTaro = typeof process !== 'undefined' && typeof process.env !== 'undefined' && typeof process.env.TARO_ENV !== 'undefined' ? true : false;
      var primaryPage = Page;
      var client = getCurrentHub$1().getClient();
      var options = client === null || client === void 0 ? void 0 : client.getOptions();

      if (isTaro) {
        var primaryComponent_1 = Component;

        Component = function Component(obj) {
          PAGE_LIFE_CYCLE.forEach(function (name) {
            if (typeof obj.methods[name] === 'function') {
              var primaryHookFn_1 = obj.methods[name];

              obj.methods[name] = function (info) {
                return self.rewritePageLifeCycle(name, this, primaryHookFn_1, info);
              };
            }
          });
          primaryComponent_1 && primaryComponent_1.call(_this, obj);
        };
      }

      Page = function Page(obj) {
        PAGE_LIFE_CYCLE.forEach(function (name) {
          var primaryHookFn = obj[name];

          obj[name] = function (info) {
            return self.rewritePageLifeCycle(name, this, primaryHookFn, info);
          };
        }); // 上报函数执行轨迹

        if (options && options.reportBreadcrumb) {
          self.rewriteFunctionReportBreadcrumb(obj);
        }

        primaryPage && primaryPage.call(_this, obj);
      };
    }; // 页面记录函数调用轨迹


    this.rewriteFunctionReportBreadcrumb = function (options) {
      var mpInstance = MP.instance();

      var _loop_1 = function _loop_1(opt) {
        if (_typeof(options[opt] === "function") && opt !== 'data') {
          var primaryHookFn_2 = options[opt];

          options[opt] = function () {
            var startTimestamp = Date.now();
            var event = {
              type: 'function',
              logType: 'breadcrumb',
              functions: [{
                functionName: opt,
                functionType: arguments[0] ? arguments[0].type : opt,
                params: encodeURIComponent(JSON.stringify(arguments)),
                url: mpInstance.currentPage,
                startTimestamp: startTimestamp,
                endTimestamp: Date.now()
              }]
            };
            getCurrentHub$1().captureEvent(event);
            return primaryHookFn_2 && primaryHookFn_2.apply(this, arguments);
          };
        }
      };

      for (var opt in options) {
        _loop_1(opt);
      }

      return options;
    }; //@ts-ignore


    this.__TIMELINE__ = {
      "in": Date.now() || new Date().getTime()
    }; // @ts-ignore

    this._appLanch = {};
    this._fpDown = false;
    this.interceptApp();
    this.interceptPage();
  }

  MPVitals.prototype.rewritePageLifeCycle = function (name, self, primaryHookFn, info) {
    var date = Date.now() || new Date().getTime();
    var mpInstance = MP.instance();
    console.log("Page\uFF1A" + name + "_" + date);
    this.__TIMELINE__["Page_" + name] = date;

    if (name === 'onHide') {
      this.__TIMELINE__['Page_init'] = date;
    }

    if (name === 'onLoad') {
      mpInstance.pageParams = {
        url: mpInstance.currentPage,
        query: info
      };
    } //页面渲染完成上报性能数据


    if (name === 'onReady') {
      var transaction = Transaction.instance();

      if (!this._fpDown) {
        this.__TIMELINE__['ready'] = date;
        this._fpDown = true;
      }

      addNavigationSpans(transaction, this.__TIMELINE__);
      addAppContexts(transaction, __assign(__assign({}, this.__TIMELINE__), {
        AppLaunch: this._appLanch
      }));
      transaction.finish();
    }

    return primaryHookFn && primaryHookFn.call(self, info);
  };

  MPVitals.instance = function () {
    if (vitals) return vitals;
    vitals = new MPVitals();
    return vitals;
  };

  return MPVitals;
}();

/**
 * Tracing integration for React Native.
 */

var MPTracing = function () {
  function MPTracing() {
    /**
     * @inheritDoc
     */
    this.name = MPTracing.id;
  }
  /**
   *  Registers routing and request instrumentation.
   */


  MPTracing.prototype.setupOnce = function ( // @ts-ignore TODO
  addGlobalEventProcessor, getCurrentHub) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this._getCurrentHub = getCurrentHub;

    this._createRouteTransaction(); // todo: init performance

  };
  /** Create route transaction. */


  MPTracing.prototype._createRouteTransaction = function () {
    if (!this._getCurrentHub) {
      logger$5.warn("hub \u5FC5\u987B\u5B58\u5728");
      return undefined;
    }

    var hub = this._getCurrentHub(); // pageLoad


    var context = {
      name: DEFAULT_NAVIGATION_NAME
    };
    var transaction = Transaction.instance(context, hub);
    transaction.initSpanRecorder();
    MPVitals.instance();
  };
  /**
   * @inheritDoc
   */


  MPTracing.id = "MPTracing";
  return MPTracing;
}();

var getCurrentHub = getCurrentHub$a;
var logger = logger$5;

var Breadcrumbs = function () {
  /**
   * @inheritDoc
   */
  function Breadcrumbs(options) {
    /**
     * @inheritDoc
     */
    this.name = Breadcrumbs.id;
    this._options = __assign({
      request: true,
      error: true,
      resource: true,
      "function": false
    }, options);
  }

  Breadcrumbs.prototype.setupOnce = function () {
    var _this = this;

    var client = getCurrentHub().getClient();
    var options = client === null || client === void 0 ? void 0 : client.getOptions();

    if (options && !options.reportBreadcrumb) {
      return false;
    }

    if (this._options.request) {
      addInstrumentationHandler({
        callback: function callback() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          _this._xhrBreadcrumb.apply(_this, __spread(args));
        },
        type: 'request'
      });
    }

    if (this._options.resource) {
      addInstrumentationHandler({
        callback: function callback() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          _this._resourceBreadcrumb.apply(_this, __spread(args));
        },
        type: 'resource'
      });
    }

    var reportBreadcrumb = function reportBreadcrumb() {
      try {
        var scope = getCurrentHub().getScope();
        var breadcrumbs = (scope === null || scope === void 0 ? void 0 : scope.getBreadcrumb()) || [];

        if (breadcrumbs.length) {
          breadcrumbs = breadcrumbs.map(function (item) {
            var type = item.type;

            switch (type) {
              case 'api_success':
                item['logKey'] = 'apis';
                break;

              case 'resource_success':
                item['logKey'] = 'resources';
                break;

              default:
                item['logKey'] = type + "s";
                break;
            }

            delete item.timestamp;
            return item;
          });
          var event_1 = {
            type: 'reportBreadcrumb',
            breadcrumbs: breadcrumbs
          };
          getCurrentHub().captureEvent(event_1);
        }
      } catch (e) {
        logger.warn('ErrorListener error');
      }
    };

    var ctx = MP.instance().context; // 添加全局上报方法

    ctx.reportBreadcrumb = reportBreadcrumb;
  };

  Breadcrumbs.prototype._xhrBreadcrumb = function (handlerData) {
    if (!handlerData.endTimestamp) {
      return;
    } // We only capture complete, non-beidou requests


    if (handlerData.__beidou_own_request__) {
      return;
    }

    var method = handlerData.method,
        url = handlerData.url,
        response = handlerData.response,
        data = handlerData.data,
        startTimestamp = handlerData.startTimestamp,
        endTimestamp = handlerData.endTimestamp;

    try {
      var event_2 = {
        type: 'api',
        logType: 'breadcrumb',
        apis: [{
          category: 'xhr',
          method: method,
          url: url,
          response: response.data,
          statusCode: response.statusCode,
          params: data,
          startTimestamp: startTimestamp,
          endTimestamp: endTimestamp
        }]
      };

      if (response.statusCode < 400) {
        //正确的请求
        event_2.type = 'api_success';
      }

      getCurrentHub().captureEvent(event_2);
    } catch (e) {
      console.warn('parse error' + e);
    }
  };
  /**
   * Creates breadcrumbs from resource API calls
   */


  Breadcrumbs.prototype._resourceBreadcrumb = function (handlerData) {
    var event = {
      type: 'resource',
      logType: 'breadcrumb',
      resources: [handlerData]
    };
    getCurrentHub().captureEvent(event);
  };
  /**
   * @inheritDoc
   */


  Breadcrumbs.id = 'Breadcrumbs';
  return Breadcrumbs;
}();

var initAndBind = initAndBind$1;
/**
 * 内部插件集合, 暂时不考虑外部情况
 */

var defaultIntegrations = [new Common(), new GlobalHandlers(), new ApiError(), new ResourceErrorIntegration(), new Breadcrumbs(), new MPTracing()];
/**
 * Beidou初始化调用处理
 */

function init(options) {
  if (options === void 0) {
    options = {};
  }

  options.isDebug = options.isDebug || false;
  options.isProd = true;
  options.maxSendEvent = options.maxSendEvent || 200;
  options.defaultIntegrations = defaultIntegrations; // 是否上报web端行为轨迹

  options.reportBreadcrumb = options.reportBreadcrumb || false;
  initAndBind(MiniProgramClient, options);
}

exports.init = init;
