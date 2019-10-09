/**
 * Contract.ts
 * @author Diao Zheng
 * @file Preconditions, Postconditions and Invariants for development purposes
 * @barrel export all
 * @barrel export assertNever
 * @barrel export ensures
 * @barrel export invariant
 * @barrel export requires
 * @barrel export isSerialisable
 */

let shouldBypass = false;

export function bypassContractChecks() {
  shouldBypass = true;
}

export function restoreContractChecks() {
  shouldBypass = false;
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
  if (__DEV__ && !shouldBypass && !inv()) {
    // tslint:disable:no-console
    const errorMessage = message || `Invariant failed: ${inv.toString()}`;
    if (shouldFail !== false) {
      // red box in case error gets caught
      console.error(errorMessage);
      throw new TypeError(errorMessage);
    } else {
      // yellow box
      console.warn(errorMessage);
    }
    // tslint:enable:no-console
  }
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
export function requires<T extends {}, Args extends any[]>(
  inv: (this: T, ...args: Args) => boolean,
  message?: string,
) {
  return <Return>(
    target: T,
    propertyKey: string,
    descriptor?: TypedPropertyDescriptor<(...args: Args) => Return>,
  ): TypedPropertyDescriptor<(...args: Args) => Return> | void => {
    if (__DEV__) {
      const wrapPrecondition = (f: (...args: Args) => Return) =>
      function(this: T, ...args: Args) {
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
    }
    return descriptor;
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
export function ensures<T extends {}, Return>(
  inv: (this: T, returnValue: Return) => boolean,
  message?: string,
) {
  return <Args extends any[]>(
    target: T,
    propertyKey: string,
    descriptor?: TypedPropertyDescriptor<(...args: Args) => Return>,
  ): TypedPropertyDescriptor<(...args: Args) => Return> | void => {
    if (__DEV__) {
      const wrapPostcondition = (f: (...args: Args) => Return) =>
      function(this: T, ...args: Args) {
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
    }
    return descriptor;
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
  if (__DEV__) {
    // tslint:disable-next-line: no-console
    console.warn(`Assertion Failure: Unexpected object ${x}.`);
  }
  throw new Error(`Unexpected object: ${x}.`);
}

export function isSerialisable(x: any) {
  try {
    JSON.stringify(x);
    return true;
  } catch {
    return false;
  }
}
