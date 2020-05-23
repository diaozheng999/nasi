/**
 * Unsafe.ts
 * @author Diao Zheng
 * @file A cast to the `Opaque` type.
 * @barrel export all
 */

import { Opaque, Unconstrained } from "./Types";

type InferRealFromOpaque<T> =
  T extends Opaque<infer U, Unconstrained> ?
    U
  :
    never
;

/**
 * Type-function that returns the result as an opaque type.
 * @param unboxed value to cast
 * @otah identity
 */
export function cast<T>(unboxed: InferRealFromOpaque<T>): T {
  return unboxed;
}
