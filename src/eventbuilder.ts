import { Event, EventHint, Options, Exception, utils } from './shared'
import { eventFromPlainObject, eventFromStacktrace, prepareFramesForEvent } from './parsers';
import { computeStackTrace } from './tracekit';

const {
  addExceptionMechanism,
  addExceptionTypeValue,
  isDOMError,
  isDOMException,
  isError,
  isErrorEvent,
  isEvent,
  isPlainObject,
  SyncPromise,
} = utils;

/**
 * Builds and Event from a Exception
 * @hidden
 */
export function eventFromException(options: Options, exception: unknown, hint?: EventHint): PromiseLike<Event> {
  const syntheticException = (hint && hint.syntheticException) || undefined;
  const event = eventFromUnknownInput(exception, syntheticException, {
    attachStacktrace: options.attachStacktrace,
  });
  return SyncPromise.resolve(event);
}

/**
 * Builds and Event from a Message
 * @hidden
 */
export function eventFromMessage(
  options: Options,
  message: string,
  hint?: EventHint,
): PromiseLike<Event> {
  const syntheticException = (hint && hint.syntheticException) || undefined;
  const event = eventFromString(message, syntheticException, {
    attachStacktrace: options.attachStacktrace,
  });
  return SyncPromise.resolve(event);
}

/**
 * @hidden
 */
export function eventFromUnknownInput(
  exception: unknown,
  syntheticException?: Error,
  options: {
    rejection?: boolean;
    attachStacktrace?: boolean;
  } = {},
): Event {
  let event: Event;

  if (isErrorEvent(exception as ErrorEvent) && (exception as ErrorEvent).error) {
    // If it is an ErrorEvent with `error` property, extract it to get actual Error
    const errorEvent = exception as ErrorEvent;
    // eslint-disable-next-line no-param-reassign
    exception = errorEvent.error;
    event = eventFromStacktrace(computeStackTrace(exception as Error));
    return event;
  }
  if (isDOMError(exception as DOMError) || isDOMException(exception as DOMException)) {
    // If it is a DOMError or DOMException (which are legacy APIs, but still supported in some browsers)
    // then we just extract the name and message, as they don't provide anything else
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
    const domException = exception as DOMException;
    const name = domException.name || (isDOMError(domException) ? 'DOMError' : 'DOMException');
    const message = domException.message ? `${name}: ${domException.message}` : name;

    event = eventFromString(message, syntheticException, options);
    addExceptionTypeValue(event, message);
    return event;
  }
  if (isError(exception as Error)) {
    // we have a real Error object, do nothing
    event = eventFromStacktrace(computeStackTrace(exception as Error));
    return event;
  }
  if (isPlainObject(exception) || isEvent(exception)) {
    // If it is plain Object or Event, serialize it manually and extract options
    // This will allow us to group events based on top-level keys
    // which is much better than creating new group when any key/value change
    const objectException = exception as Record<string, unknown>;
    event = eventFromPlainObject(objectException, syntheticException, options.rejection);
    // addExceptionMechanism(event, {
    //   synthetic: true,
    // });
    return event;
  }

  // If none of previous checks were valid, then it means that it's not:
  // - an instance of DOMError
  // - an instance of DOMException
  // - an instance of Event
  // - an instance of Error
  // - a valid ErrorEvent (one with an error property)
  // - a plain Object
  //
  // So bail out and capture it as a simple message:
  event = eventFromString(exception as string, syntheticException, options);
  addExceptionTypeValue(event, `${exception}`, undefined);
  addExceptionMechanism(event, {
    synthetic: true,
  });

  return event;
}

/**
 * @hidden
 */
export function eventFromString(
  input: string,
  syntheticException?: Error,
  options: {
    attachStacktrace?: boolean;
  } = {},
): Event {

  const ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
  let name;
  let message = input;
  const groups = input.match(ERROR_TYPES_RE);
  if (groups) {
    name = groups[1];
    message = groups[2];
  }
  const exceptions: Exception = {
    content: `${name || 'Error'}:${message}`,
  };

  if (options.attachStacktrace && syntheticException) {
    const stacktrace = computeStackTrace(syntheticException);
    exceptions.stacktrace = prepareFramesForEvent(stacktrace.stack);
  }

  return {
    exceptions: [exceptions]
  };
}
