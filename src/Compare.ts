/**
 * Compare.ts
 * @author Diao Zheng
 * @file functions for comparison
 */

// @barrel export all

import _ from "lodash";
import { isNone, isSome, Type as Option, wrapNotNaN } from "./Option";

type ComparisonResult = -1 | 0 | 1;
type Comparison<T> = (a: T, b: T) => ComparisonResult;

export type Type<T> = Comparison<T>;

function clampToComparison(result: number): ComparisonResult {
  if (!result || _.isNaN(result)) {
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
  } else if (isSome(wrappedA) && isNone(wrappedA)) {
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

export function option<T>(
  cmp: Comparison<T>,
  hoistNone: boolean = false,
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
