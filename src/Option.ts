/**
 * Option.ts
 * @author Diao Zheng
 * @file Utility functions and type definitions for option types.
 *
 * Internally, Option<T> is wrapped as T | undefined. The functions here assume
 * that T is not null, i.e. Option<undefined> is not well typed.
 *
 * @barrel export all
 */

import { assertNever as newAssertNever } from "./Contract";
import { devOnly } from "./Dev";

type Option<T> = T | undefined;

type WrappedRecordOption<T, K extends string | number | symbol> =
  { [key in K]?: T }[K]
;

export type Type<T> = Option<T>;

export type Nullable<T> = T | null;

/**
 * Asserts the value type of T, where `T` is constructed as `Option.Type`.
 *
 * E.g. `Option.Some<Option.Type<string>>` resolves to `string`.
 *
 * This makes use of the fact that conditional types are distributed across
 * unions and intersections.
 *
 * As a result, note this edge case:
 * `Option.Some<Option.Type<undefined>>` resolves to `never`
 */
export type Some<T> =
  T extends undefined ?
    never
  :
    T
;
/**
 * Asserts the value type of T, where T is constructed as `Option.Nullable`.
 *
 * E.g. `Option.NotNull<Option.Nullable<string>>` resolves to `string`.
 *
 * This makes use of the fact that conditional types are distributed across
 * unions and intersections.
 *
 * As a result, note thess edge cases:
 * - `Option.NotNull<Option.Type<undefined>>` resolves to `never`
 * - `Option.NotNull<Option.Type<null>>` resolves to `never`
 * - `Option.NotNull<Option.Nullable<undefined>>` resolves to `never`
 * - `Option.NotNull<undefined>` resolves to `never`
 *
 * Additionally, this is a less stringent type check than `Some`, so in most
 * cases, where `null` is not part of the type `T`, we get
 * `Option.NotNull<Option.Type<T>>` resolving to `T`.
 */
export type NotNull<T> =
  T extends undefined | null ?
    never
  :
    T
;

/**
 * returns true iff option is Some(value)
 * @param opt option
 */
export function isSome<T>(opt: Option<T>): opt is T {
  return opt !== undefined;
}

/**
 * returns true iff option is None
 * @param opt option
 */
export function isNone<T extends {}, K extends string | number | symbol>(
  opt: WrappedRecordOption<T, K>,
): opt is undefined;
export function isNone<T>(opt: Option<T>): opt is undefined;
export function isNone<T>(opt: Option<T>): opt is undefined {
  return opt === undefined;
}

/**
 * returns value if option is Some<value>, defaultValue otherwise.
 * @param opt option
 * @param defaultValue the default value to return if option is None.
 */
export function value<
  V,
  T extends { [k in K]?: Option<V> },
  K extends keyof T,
>(
  opt: T[K] | undefined,
  defaultValue: V,
): V;
export function value<T>(opt: Option<T>, defaultValue: T): T;
export function value<T>(opt: Option<T>, defaultValue: T): T {
  if (isSome(opt)) {
    return opt;
  }
  return defaultValue;
}

/**
 * Similar to value, returns value if option is Some<value>, defaultValue
 * otherwise. Note that defaultValue will not be evaluated until absolutely
 * necessary.
 * @param opt option
 * @param defaultValue the default value to return if option is None.
 */
export function value_<T, TDefaultArguments extends any[]>(
  opt: Option<T>,
  defaultValue: (...args: TDefaultArguments) => T,
  // tslint:disable-next-line:trailing-comma
  ...defaultParams: TDefaultArguments
): T {
  if (isSome(opt)) {
    return opt;
  }
  return defaultValue(...defaultParams);
}

/**
 * Returns value iff option is Some<value>, otherwise throws exception.
 * @param opt option
 */
export function valOf<T>(opt: Option<T>): T {
  if (isSome(opt)) {
    return opt;
  }
  throw new Error("Option is None.");
}

/**
 * Maps the option type such that if option is Some(a), then will return
 * Some(f(a)). Note that option wrapping is not supported, i.e. if fn has
 * type T => Option<U>, map<T> will return type Option<U> rather than
 * Option<Option<U>>.
 *
 * @param opt option
 * @param fn mapping function
 */
export function map<T, U>(opt: Option<T>, fn: ($0: T) => Option<U>): Option<U>;
export function map<T, U>(opt: Option<T>, fn: ($0: T) => U): Option<U> {
  if (isSome(opt)) {
    return fn(opt);
  }
  return undefined;
}

/**
 * Wraps a truthy value into an option. Falsy values are:
 *  * `false: boolean`
 *  * `0: number`
 *  * `"": string`
 *  * `null: null`
 *  * `undefined: undefined`
 *  * `NaN: number`
 * @param val a value. If evaluated to true in JavaScript, will be retained as
 *            Some(value). If evaluated to false in JavaScript, will be None.
 */
export function truthy<T>(val: Nullable<T>): Option<T>;
export function truthy<T>(val: T): Option<T> {
  return val || undefined;
}

/**
 * Special case of `truthy` to only wrap `NaN` to None. (0 is wrapped to
 * Some(0)).
 * @param val number (possibly `NaN`) to wrap.
 */
export function wrapNotNaN(val: number): Option<number> {
  return isNaN(val) ? undefined : val;
}

/**
 * Special case of `truthy` to only wrap `null` to None.
 * @param val a possibly nullable value.
 */
export function wrapNotNull<T>(val: Nullable<T>): Option<T> {
  return val === null ? undefined : val;
}

/**
 * Special case of `truthy` to wrap `NaN` and +/- infinity to None. (0 and -0
 * are wrapped to Some(0)).
 * @param val number (possibly `NaN`) to wrap.
 */
export function wrapFinite(val: number): Option<number> {
  return Number.isFinite(val) ? val : undefined;
}

/**
 * Shortcut function that has the following equivalence:
 *
 *   map(val, wrapNotNaN) <=> mapNotNaN(val)
 *
 * This function does the following:
 * 1. If `val` is `undefined` (aka None), return `undefined` aka None.
 * 2. Execute the `wrapNotNaN` function on `val` if `val` is not `undefined` (
 * aka Some(_))
 *
 * Examples:
 *   - `mapNotNaN(undefined)` evaluates to `undefined`
 *   - `mapNotNaN(NaN)` evaluates to `undefined`
 *   - `mapNotNaN(Infinity)` evaluates to `Infinity`
 *   - `mapNotNaN(5)` evaluates to `5`
 *   - `mapNotNaN(-0)` evaluates to `-0`
 * @param val option of number that is possibly `NaN`
 */
export function mapNotNaN(val: Option<number>): Option<number> {
  if (val === undefined) {
    return;
  }
  if (isNaN(val)) {
    return;
  }
  return val;
}

/**
 * Shortcut function that has the following equivalence:
 *
 *   map(val, wrapFinite) <=> mapFinite(val)
 *
 * This function does the following:
 * 1. If `val` is `undefined` (aka None), return `undefined` aka None.
 * 2. Execute the `wrapFinite` function on `val` if `val` is not `undefined` (
 * aka Some(_))
 *
 * Examples:
 *   - `mapFinite(undefined)` evaluates to `undefined`
 *   - `mapFinite(NaN)` evaluates to `undefined`
 *   - `mapFinite(Infinity)` evaluates to `undefined`
 *   - `mapFinite(5)` evaluates to `5`
 *   - `mapFinite(-0)` evaluates to `-0`
 * @param val option of number that is possibly `NaN` or `Infinity`
 */
export function mapFinite(val: Option<number>): Option<number> {
  if (val === undefined) {
    return;
  }
  if (Number.isFinite(val)) {
    return val;
  }
  return;
}

/**
 * Returns Some([u, v]) iff opt1 is Some(u) and opt2 is Some(v).
 * @param opt1 u
 * @param opt2 v
 */
export function both<T, U>(opt1: Option<T>, opt2: Option<U>): Option<[T, U]> {
  if (isSome(opt1) && isSome(opt2)) {
    return [opt1, opt2];
  }
  return undefined;
}

/**
 * Returns Some(value). Throws an error if value is undefined.
 * @param val value
 */
export function some<T>(val: T): Option<T> {
  if (val === undefined) {
    throw new Error("Option<undefined> is not well typed.");
  }
  return val;
}

/**
 * Returns None.
 */
export function none<T>(): Option<T> {
  return undefined;
}

/**
 * Chooses a value to return depending if option is some value.
 * @param opt an option
 * @param ifSome value to return if option is Some(_)
 * @param ifNone value to return if option is None
 */
export function choice<T>(opt: Option<unknown>, ifSome: T, ifNone: T): T {
  if (isSome(opt)) {
    return ifSome;
  }
  return ifNone;
}

/**
 * Choose a value to return depending on if option is some value.
 *
 * This is equivalent to:
 * ```
 * Option.value(Option.map(opt, ifSome), ifNone);
 * ```
 *
 * @param opt an option
 * @param ifSome a function that executes if option is Some(_)
 * @param ifNone the default return value
 */
export function mapChoice<T, U>(
  opt: Option<T>,
  ifSome: (value: T) => U,
  ifNone: U,
): U {
  if (isSome(opt)) {
    return ifSome(opt);
  }
  return ifNone;
}

/**
 * Chooses a value to return depending on if option is some value.
 *
 * This is similar to `mapChoice` except `ifNone` is evaluated lazily.
 *
 * @param opt an option
 * @param ifSome a function that executes if option is Some(_)
 * @param ifNone a function that executes if option is None
 */
export function mapChoice_<T, U>(
  opt: Option<T>,
  ifSome: (value: T) => U,
  ifNone: () => U,
): U {
  if (isSome(opt)) {
    return ifSome(opt);
  }
  return ifNone();
}

/**
 * Returns true iff both options have values, and comparison function returns
 * true.
 *
 * @param opt1 First optional value
 * @param opt2 Second optional value
 * @param comparison comparison function
 */
export function compareSome<T, U>(
  opt1: Option<T>,
  opt2: Option<U>,
  comparison: (val1: T, val2: U) => boolean,
): boolean {
  if (isSome(opt1) && isSome(opt2)) {
    return comparison(opt1, opt2);
  }
  return false;
}

/**
 * @deprecated Prefer the use of `assert(Option.isSome, opt)` instead.
 */
export function assertSome<T>(
  opt: Option<T>,
  screenName?: string,
): T
{
  devOnly(() => {
    if (isNone(opt)) {
      const name = screenName ? ` ${screenName}` : "";
      // tslint:disable-next-line:no-console
      console.warn(`Assertion Failure: Field${name} does not contain a value.`);
    }
  });
  return opt as T;
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
 * @deprecated Use Contract.assertNever instead.
 */
export function assertNever(x: never): never
{
  devOnly(() => {
    // tslint:disable-next-line: no-console
    console.warn(
      `Option.assertNever is deprecated. Use Contract.assertNever instead.`,
    );
  });
  return newAssertNever(x);
}

/**
 * @deprecated in TypeScript 3.7 in favour of nil-coelescing operator
 */
export function property<T extends {}, K extends keyof T>(
  opt: Option<T>,
  key: K,
): Option<T[K]>;
export function property<T extends {}, K extends keyof T>(
  opt: Option<T>,
  key: K,
  defaultValue: T[K],
): T[K];
export function property<T extends {}, K extends keyof T>(
  opt: Option<T>,
  key: K,
  defaultValue?: T[K],
): Option<T[K]> {
  if (isSome(opt)) {
    return value(opt[key], defaultValue);
  }
  return defaultValue;
}

/**
 * @deprecated prefer `f?.(...args)` instead.
 */
export function execute<TArgs extends any[]>(
  f: Option<(...args: TArgs) => void>,
  ...args: TArgs
): void;
export function execute<TArgs extends any[], TReturn>(
  f: Option<(...args: TArgs) => TReturn>,
  ...args: TArgs
): Option<TReturn>;
export function execute<TArgs extends any[], TReturn>(
  f: Option<(...args: TArgs) => TReturn>,
  ...args: TArgs
): Option<TReturn> {
  if (isSome(f)) {
    return f(...args);
  }
  return;
}
