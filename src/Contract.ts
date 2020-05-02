/**
 * Contract.ts
 * @author Diao Zheng
 * @file Preconditions, Postconditions and Invariants for development purposes
 * @barrel export all
 * @barrel export assert
 * @barrel export assertNever
 * @barrel export ensures
 * @barrel export invariant
 * @barrel export requires
 * @barrel export isSerialisable
 */

import { devOnly, select } from "./Dev";
import { AnyArray, Unconstrained } from './Types';

let shouldBypass = false;
let shouldBypassMessages: boolean | RegExp = false;

export function bypassContractChecks() {
  shouldBypass = true;
}

export function restoreContractChecks() {
  shouldBypass = false;
}

export function dismissContractMessages(message?: RegExp) {
  shouldBypassMessages = message ?? true;
}

export function restoreContractMessages() {
  shouldBypassMessages = false;
}

function shouldDisplayContractMessage(message: string): boolean {
  if (typeof shouldBypassMessages === "boolean") {
    return !shouldBypassMessages;
  }
  return !shouldBypassMessages.exec(message);
}

export function invariantInDev(
  inv: () => boolean,
  message?: string,
  shouldFail?: boolean,
) {
  if (!shouldBypass && !inv()) {
    /* eslint-disable no-console */
    const errorMessage = message || `Invariant failed: ${inv.toString()}`;
    if (shouldFail !== false) {
      // red box in case error gets caught
      if (shouldDisplayContractMessage(errorMessage)) {
        console.error(errorMessage);
      }
      throw new TypeError(errorMessage);
    } else if (shouldDisplayContractMessage(errorMessage)) {
      // yellow box
      console.warn(errorMessage);
    }
    /* eslint-enable no-console */
  }
}

 /**
  * Fails with a warning or message if invariant fails at DEV environment and
  * tests.
  *
  * If `message` is not defined, it will say something to the effect of:
  *   ```Invariant failed: function() {...}```
  * @param inv Invariant function. This should evaluate to something truthy.
  * @param message The message to pass in if don't want the `Invariant failed:`
  * message.
  * @param shouldFail If true, will raise a red box, otherwise will raise a
  * yellow box. Defaults to true.
  */
 export function invariant(
  inv: () => boolean,
  message?: string,
  shouldFail?: boolean,
) {
  devOnly(invariantInDev, inv, message, shouldFail);
}

export function assert<T, K extends T>(
  assertion: (item: T) => item is K,
  item: T,
  message?: string,
): asserts item is K {
  return invariant(assertion.bind(undefined, item), message);
}

/**
 * The provided invariant must return true before the execution of the method.
 *
 * Use this to assert things about the input parameters to the function as well
 * as the state of the class before method execution.
 *
 * @param inv The invariant function. If not an arrow function, the this pointer
 * is bound to the current instance/static object.
 */
export function requires<T extends {}, TArgs extends AnyArray>(
  inv: (this: T, ...args: TArgs) => boolean,
  message?: string,
) {
  return <TReturn>(
    target: T,
    propertyKey: string,
    descriptor?: TypedPropertyDescriptor<(...args: TArgs) => TReturn>,
  ): TypedPropertyDescriptor<(...args: TArgs) => TReturn> | void => {
    return select(() => {
      const wrapPrecondition = (f: (...args: TArgs) => TReturn) =>
      function(this: T, ...args: TArgs) {
        invariant(
          () => inv.call(this, ...args),
          `Precondition failed for ${target.constructor.name}.${propertyKey}` +
          (message ? `: ${message}` : "."),
        );
        const returnValue = f.call(this, ...args);
        return returnValue;
      };

      if (descriptor) {
        // this is used as a method decorator
        const contract = { ...descriptor };
        if (descriptor.value) {
          const actualValue = descriptor.value;
          contract.value = wrapPrecondition(actualValue);
        }
        if (descriptor.get) {
          const actualGetter = descriptor.get;
          contract.get = () => wrapPrecondition(actualGetter());
        }
        return contract;
      }
      return descriptor;
    }, () => {
      return descriptor;
    });
  };
}
/**
 * The provided invariant must return true after the execution of the method.
 *
 * Use this to assert things about the return value of the function as well
 * as the state of the class before method execution.
 *
 * @param inv The invariant function. If not an arrow function, the this pointer
 * is bound to the current instance/static object.
 */
export function ensures<T extends {}, TReturn>(
  inv: (this: T, returnValue: TReturn) => boolean,
  message?: string,
) {
  return <TArgs extends AnyArray>(
    target: T,
    propertyKey: string,
    descriptor?: TypedPropertyDescriptor<(...args: TArgs) => TReturn>,
  ): TypedPropertyDescriptor<(...args: TArgs) => TReturn> | void => {
    return select(() => {
      const wrapPostcondition = (f: (...args: TArgs) => TReturn) =>
      function(this: T, ...args: TArgs) {
        const returnValue = f.call(this, ...args);
        invariant(
          inv.bind(this, returnValue),
          `Postcondition failed for ${target.constructor.name}.${propertyKey}` +
          (message ? `: ${message}` : "."),
        );
        return returnValue;
      };

      if (descriptor) {
        // this is used as a method decorator
        const contract = { ...descriptor };
        if (descriptor.value) {
          const actualValue = descriptor.value;
          contract.value = wrapPostcondition(actualValue);
        }
        if (descriptor.get) {
          const actualGetter = descriptor.get;
          contract.get = () => wrapPostcondition(actualGetter());
        }
        return contract;
      }
      return descriptor;
    }, () => {
      return descriptor;
    });
  };
}

/**
 * To throw you an compile error since nothing will be `never`.
 * @example
 * // In switch statements, use it like this to protect against missing cases:
 * switch(action)
 *   // case "MISSING_CASE":
 *   //  break;
 *   default:
 *     // error: argument of type 'MISSING_CASE' is not assignable.
 *     assertNever(action);
 * }
 * @param x can be anything
 */
export function assertNever(x: never): never
{
  devOnly(() => {
    // eslint-disable-next-line no-console
    console.warn(`Assertion Failure: Unexpected object ${x}.`);
  });
  throw new Error(`Unexpected object: ${x}.`);
}

export function isSerialisable(x: Unconstrained) {
  try {
    JSON.stringify(x);
    return true;
  } catch {
    return false;
  }
}
