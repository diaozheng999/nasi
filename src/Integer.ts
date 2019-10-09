/**
 * Integer.ts
 * @author Diao Zheng
 * @file Opaque type definitions for Integer
 * @barrel export all
 */

import * as Option from "./Option";
import { Opaque } from "./Types";

const INTERNAL_INT31_SYMBOL = Symbol();

export type int31 = Opaque<number, typeof INTERNAL_INT31_SYMBOL>;

export type Type = int31;

/**
 * Maximum signed integer allowed.
 * This is 2^31 - 1 since this is the value taken to be a boxed signed integer
 * for most virtual machines under 2's complement.
 */
export const INT_MAX = 1073741823;

/**
 * Minimum signed integer allowed.
 * This is -2^31 since this is the value taken to be a boxed signed integer
 * for most virtual machines under 2's complement.
 */
export const INT_MIN = -1073741824;

export const Typed = {
  INT_MAX: UNSAFE_ofNumber(INT_MAX),
  INT_MIN: UNSAFE_ofNumber(INT_MIN),
};

export function ofNumber(n: number): Option.Type<int31> {
  if (n <= INT_MAX && n >= INT_MIN) {
    // tslint:disable-next-line:no-bitwise
    return (n | 0) as int31;
  }
  return;
}

export function UNSAFE_ofNumber(n: number): int31 {
  return n as int31;
}
