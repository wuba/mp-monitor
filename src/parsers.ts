import { Event, Exception, StackFrame, utils } from './shared';
import { computeStackTrace, StackFrame as TraceKitStackFrame, StackTrace as TraceKitStackTrace } from './tracekit';

const { extractExceptionKeysForMessage, isEvent, is } = utils;
const STACKTRACE_LIMIT = 50;
/**
 * This function creates an exception from an TraceKitStackTrace
 * @param stacktrace TraceKitStackTrace that will be converted to an exception
 * @hidden
 */
export function exceptionFromStacktrace(stacktrace: TraceKitStackTrace): Exception {
  const frames = prepareFramesForEvent(stacktrace.stack);
  const type = stacktrace.name;
  const value = stacktrace.message;
  const exception: Exception = {
    content: `${type}:${value}`,
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
export function eventFromPlainObject(
  exception: Record<string, unknown>,
  syntheticException?: Error,
  rejection?: boolean,
): Event {
  let type = isEvent(exception) ? exception.constructor.name : rejection ? 'UnhandledRejection' : 'Error';
  let value = `Non-Error ${rejection ? 'promise rejection' : 'exception'
    } captured with keys is ${extractExceptionKeysForMessage(exception)}`;
  const event: Event = {
    exceptions: [
      {
        content: `${type}:${value}`,
      },
    ],
  };

  if (syntheticException) {
    const stacktrace = computeStackTrace(syntheticException);
    const frames = prepareFramesForEvent(stacktrace.stack);
    event.stacktrace = {
      frames,
    };
  }

  return event;
}

/**
 * @hidden
 */
export function eventFromStacktrace(stacktrace: TraceKitStackTrace): Event {
  const exceptions = exceptionFromStacktrace(stacktrace);

  return {
    exceptions: [exceptions],
  };
}

/**
 * @hidden
 */
export function prepareFramesForEvent(stack: TraceKitStackFrame[]): StackFrame[] {
  if (!stack || !stack.length) {
    return [];
  }

  let localStack = stack;

  const firstFrameFunction = localStack[0].func || '';
  const lastFrameFunction = localStack[localStack.length - 1].func || '';

  // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)
  if (firstFrameFunction.indexOf('captureMessage') !== -1 || firstFrameFunction.indexOf('captureException') !== -1) {
    localStack = localStack.slice(1);
  }

  // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)
  if (lastFrameFunction.indexOf('beidouWrapped') !== -1) {
    localStack = localStack.slice(0, -1);
  }

  // The frame where the crash happened, should be the last entry in the array
  return localStack
    .slice(0, STACKTRACE_LIMIT)
    .map(
      (frame: TraceKitStackFrame): StackFrame => ({
        colno: frame.column === null ? undefined : frame.column,
        filename: frame.url || localStack[0].url,
        function: frame.func || '?',
        lineno: frame.line === null ? undefined : frame.line,
      }),
    )
    .reverse();
}

/**
 * @hidden
 */
interface Data {
  [key: string]: any;
}

export function responseFormat(data: Data = {}): Data {
  if (!Object.keys(data).length) {
    return {};
  }
  let res: Data = {};
  for (let key in data) {
    const type = is(data[key]);
    if (type === 'Object') {
      res[key] = '[Object]';
    } else if (type === 'Array') {
      res[key] = '[Array]';
    } else {
      res[key] = data[key];
    }
  }
  return res;
}
