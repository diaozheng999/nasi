/**
 * Integer.ts
 * @author Diao Zheng
 * @file Opaque type definitions for Integer
 * @barrel export all
 */
import * as Option from "./Option.ts";
import { Opaque } from "./Types.ts";
declare const INTERNAL_INT31_SYMBOL: unique symbol;
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
export function UNSAFE_ofNumber(n: number): int31 {
  return n as int31;
}
export const Typed = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  INT_MAX: UNSAFE_ofNumber(INT_MAX),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  INT_MIN: UNSAFE_ofNumber(INT_MIN),
};
export function ofNumber(n: number): Option.Type<int31> {
  if (n <= INT_MAX && n >= INT_MIN) {
    return (n | 0) as int31;
  }
  return;
}
export function toHex(n: int31): string {
  // eslint-disable-next-line no-magic-numbers
  return n.toString(16);
}
export function toHexUnsafe(n: number): string {
  const i = ofNumber(n);
  if (i) {
    return toHex(i);
  }
  return `${n}`;
}
