/**
 * Types.ts
 * @author Diao Zheng
 * @file Common (more advanced) type patterns
 * @ignore_test
 * @barrel export all
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __tyinternal_type: unique symbol;

/** An opaque type of T with a phantom label. */
export type Opaque<T, TLabel> = T & { [__tyinternal_type]: TLabel };

/**
 * The argument type of T (which is a function).
 * (In TypeScript 3.2, the spread operator can be inferred)
 */
export type ArgumentType<T> =
  T extends ((arg0: infer U) => Unconstrained) ?
    U
  : T extends ((...args: infer Us) => Unconstrained) ?
    Us
  :
    never
;

export type ArgumentTupleType<T> =
  T extends (...args: infer U) => Unconstrained ? U : never;

/**
 * Export the return type of T (which is a function).
 */
export type ReturnType<T> =
  T extends (() => infer R) ?
    R
  : T extends ((...args: Unconstrained[]) => infer Rt) ?
    Rt
  :
    never
;

export interface Typed<T, U> {
  type: T;
  value: U;
}
/** @deprecated use `Typed<T, U>` instead */
export type ITyped<T, U> = Typed<T, U>;

/**
 * @deprecated (TypeScript 3.5)
 * use `Omit` instead.
 */
export type ExcludeKeys<T, K> = Pick<T, Exclude<keyof T, K>>;

/**
 * @deprecated this type literally refer to a string type in JSON or interface
 * member that is deprecated. This is needed whenever a string typed member is
 * needed in JSON or interface to take care backward comparability.
 */
export type Deprecated = "__deprecated__";

export type Not<U, T> = T extends U ? never : U;

/**
 * The result type of a promise
 */
export type Awaited<T> =
  T extends undefined ?
    T
  : T extends PromiseLike<infer U> ?
    U
  :
    T
;

/**
 * Unconstrained should be used responsibly, as this bypasses the
 * `no-explicit-any` lint check.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Unconstrained = any;

/**
 * AnyArray should be used responsibly, as this bypasses the
 * `no-explicit-any` lint check.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArray = any[];
