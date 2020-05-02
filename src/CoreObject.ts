/**
 * CoreObject.ts
 * @author Diao Zheng
 * @file Object helper functions
 * @barrel export all
 */

import { Unconstrained } from './Types';

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
  const take: Unconstrained = {};
  const drop: Unconstrained = {};

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
