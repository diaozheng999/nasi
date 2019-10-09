/**
 * Types.ts
 * @author Diao Zheng
 * @file Common (more advanced) type patterns
 * @ignore_test
 * @barrel export all
 */

/** An opaque type of T with a phantom label. */
export type Opaque<T, TLabel> = T & { __tyinternal_type: TLabel };

/**
 * The argument type of T (which is a function).
 * (In TypeScript 3.2, the spread operator can be inferred)
 */
export type ArgumentType<T> =
  T extends ((arg0: infer U) => any) ?
    U
  : T extends ((...args: infer Us) => any) ?
    Us
  :
    never
;

export type ArgumentTupleType<T> =
  T extends (...args: infer U) => any ? U : never;

/**
 * Export the return type of T (which is a function).
 */
export type ReturnType<T> =
  T extends (() => infer R) ?
    R
  : T extends ((...args: any[]) => infer Rt) ?
    Rt
  :
    never
;

export interface ITyped<T, U> {
  type: T;
  value: U;
}

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
