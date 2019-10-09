/**
 * CoreObject.ts
 * @author Diao Zheng
 * @file Object helper functions
 * @barrel export all
 */

import _ from "lodash";

export function *keys<K extends {}>(obj: K): IterableIterator<keyof K> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      yield key;
    }
  }
}

export function split<K extends {}, S extends keyof K>(
  obj: K,
  keysToKeep: readonly S[],
): readonly [ Pick<K, S>, Pick<K, Exclude<keyof K, S>> ] {
  const take: any = {};
  const drop: any = {};

  const toKeep = new Set<keyof K>(keysToKeep);

  for (const key of keys(obj)) {
    if (toKeep.has(key)) {
      take[key] = obj[key];
    } else {
      drop[key] = obj[key];
    }
  }

  return [ take, drop ];
}
