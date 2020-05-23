/**
 * Compare.ts
 * @author Diao Zheng
 * @file functions for comparison
 */

// @barrel export all

import { isNone, isSome, Type as Option, wrapNotNaN } from "./Option.ts";

type ComparisonResult = -1 | 0 | 1;
type Comparison<T> = (a: T, b: T) => ComparisonResult;

export type Type<T> = Comparison<T>;
export type Unordered<T> = (a: T, b: T) => boolean;

export function clampToComparison(result: number): ComparisonResult {
  if (!result || isNaN(result)) {
    return 0;
  }

  if (result > 0) {
    return 1;
  }

  return -1;
}

export function numeric(a: number, b: number): ComparisonResult {
  const wrappedA = wrapNotNaN(a);
  const wrappedB = wrapNotNaN(b);

  if (isSome(wrappedA) && isSome(wrappedB)) {
    if (a === b) {
      return 0;
    } else if (a < b) {
      return -1;
    }
    return 1;
  } else if (isSome(wrappedA) && isNone(wrappedB)) {
    return 1;
  } else if (isNone(wrappedA) && isSome(wrappedB)) {
    return -1;
  }
  return 0;
}

export function reverse(n: ComparisonResult): ComparisonResult {
  // this is fine cos typescript
  return -n as ComparisonResult;
}

export function str(a: string, b: string) {
  return clampToComparison(a.localeCompare(b));
}

/**
 * Timing-safe string comparison function.
 * @see https://snyk.io/blog/node-js-timing-attack-ccc-ctf/
 * @param a The string to compare against.
 * @param b The string to compare with.
 */
export function strEq(a: string, b: string): boolean {
  let result = 0;
  const length = a.length;

  const s1 = a;
  const s2 = a.length === b.length ? b : a;

  for (let i = 0; i < length; ++i) {
    // tslint:disable-next-line: no-bitwise
    result |= (s1.charCodeAt(i) ^ s2.charCodeAt(i));
  }

  return !(a.length - b.length) && !result;
}

export function option<T>(
  cmp: Comparison<T>,
  hoistNone = false,
): Comparison<Option<T>> {
  const noneSortOrder: ComparisonResult = hoistNone ? -1 : 1;
  return (a, b) => {
    if (isSome(a) && isSome(b)) {
      return cmp(a, b);
    } else if (isNone(b)) {
      return noneSortOrder;
    } else if (isNone(a)) {
      return -noneSortOrder as ComparisonResult;
    }
    return 0;
  };
}

export function unordered<T>(cmp: Comparison<T>): Unordered<T> {
  return (a, b) => !cmp(a, b);
}

export function array<T>(cmp: Comparison<T>): Comparison<T[]> {
  return (a, b) => {
    const commonLength = Math.min(a.length, b.length);
    const compareOption = option(cmp, true);
    for (let i = 0; i < commonLength; ++i) {
      const result = compareOption(a[i], b[i]);
      if (result) {
        return result;
      }
    }
    return numeric(a.length - commonLength, b.length - commonLength);
  };
}
