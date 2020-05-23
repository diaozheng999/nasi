/**
 * MemoryCache.ts
 * @author Diao Zheng
 * @file A simple in-memory cache that stores computed objects and somesuch.
 * @barrel export createMemoryCacheLegacy
 */

/* eslint-disable */

import SplayTree from "splaytree"; // @deno rewrite
import * as Hashing from "./Hashing";
import * as Option from "./Option";

/**
 * The number of items to cache
 */
const CACHE_SIZE = 4000;
/**
 * The default time to expire (in milliseconds)
 */
const CACHE_DEFAULT_EXPIRY = 60000;

export interface ICacheLine<T, K> {
  key: number | K;
  value: T;
  expiry: number;
}

// tslint:disable-next-line:class-name
class DEPRECATED_MemoryCacheInternalLegacy {

  public get currentSize() {
    return this.cache.size;
  }
  private cache: SplayTree<number, ICacheLine<any, any>>;
  private maxEntries: number;
  private trimThreshold: number;

  constructor(maxEntries: number) {
    this.maxEntries = maxEntries;
    // we amortise the amount to trim such that, as a guarantee, every time
    // when we perform a trim, the amount we cache is halved. This means that
    // we only perform the trim function half as often when we do the
    // insert -> delete -> insert -> delete cycle. This means we lose some
    // cached data (which is okay since it's a cache anyway), but we don't
    // overperform the trim operation.
    this.trimThreshold = maxEntries / 2;
    this.cache = new SplayTree();
  }

  /**
   * Perform a set operation with a precomputed hash. Doing this will NOT
   * perform any collision avoidance.
   * @param key the precomputed hash
   * @param value the data to cache
   * @param expiry if present, the epoch (in ms) that the data will expire.
   * Defaults to 60 seconds from now.
   */
  public UNSAFE_set<T>(key: number, value: T, expiry?: number) {
    this.setInternal(key, key, value, expiry);
  }

  /**
   * Updates the cache key with the said value. Note that this is dependent
   * on hash not colliding (which is unlikely).
   * @param key the key to store
   * @param value the data to cache
   * @param expiry if present, the epoch (in ms) that the data will expire.
   * Defaults to 60 seconds from now.
   */
  public set<T, K>(key: K, value: T, expiry?: number) {
    this.setInternal(Hashing.hash(key), key, value, expiry);
  }

  /**
   * Returns the current cache line keyed by the precomputed hash. This will
   * not perform collision avoidance, but will remove the cache line should the
   * cache expires.
   * @param key the precomputed hash
   */
  public UNSAFE_getLine<T>(key: number): Option.Type<ICacheLine<T, any>> {
    const data = Option.map(
      Option.truthy(this.cache.find(key)),
      (node) => node.data,
    );
    if (!data) {
      return;
    }

    if (data.expiry < new Date().getTime()) {
      this.cache.remove(key);
      return;
    }

    return data;
  }

  public UNSAFE_get<T>(key: number): Option.Type<T> {
    const data = this.UNSAFE_getLine<T>(key);
    if (data && data.key === key) {
      return data.value;
    }
    return;
  }

  public get<T, K>(key: K, comparator?: (cached: K, expected: K) => boolean) {
    const defaultHash = Hashing.hash(key);
    const defaultData = this.UNSAFE_getLine<T>(defaultHash);
    if (defaultData) {
      if (comparator) {
        if (comparator(defaultData.key, key)) {
          return defaultData.value;
        }
      } else if (defaultData.key === key) {
        return defaultData.value;
      }
    }
    return;
  }

  public clear() {
    this.cache.clear();
  }

  public UNSAFE_printAllCacheValues() {
    let output = "";
    this.cache.forEach((node) => {
      output += (
        `\nkey: ${node.key} (0x${node.key.toString(16)})\tvalue: ` +
        JSON.stringify(node.data, undefined, 2) + "\n"
      );
    });
    // tslint:disable-next-line: no-console
    console.warn(output);
  }

  private constructCacheLine<T, K>(
    key: number | K,
    value: T,
    expiry?: number,
  ): ICacheLine<T, K> {
    const finiteExpiry = Option.mapFinite(expiry);
    if (Option.isSome(finiteExpiry)) {
      return { expiry: finiteExpiry, key, value };
    }
    return {
      expiry: new Date().getTime() + CACHE_DEFAULT_EXPIRY,
      key,
      value,
    };
  }

  private setInternal(
    hash: number,
    key: any,
    value: any,
    expiry?: number,
  ) {
    this.trim();
    if (this.cache.contains(hash)) {
      this.cache.remove(hash);
    }
    this.cache.add(hash, this.constructCacheLine(key, value, expiry));
  }

  private trim() {
    if (this.cache.size < this.maxEntries) {
      return;
    }
    const keysToRemove: number[] = [];
    let i = 0;

    const currentTime = new Date().getTime();

    this.cache.forEach((node) => {
      if (node.data.expiry < currentTime) {
        keysToRemove.push(node.key);
      }

      if (++i > this.trimThreshold) {
        keysToRemove.push(node.key);
      }
    });

    for (const key of keysToRemove) {
      this.cache.remove(key);
    }
  }
}

/** @deprecated */
export const MemoryCacheLegacy = new DEPRECATED_MemoryCacheInternalLegacy(
  CACHE_SIZE,
);

/**
 * @deprecated
 */
export function createMemoryCacheLegacy(cacheSize?: number) {
  return new DEPRECATED_MemoryCacheInternalLegacy(
    Option.value(cacheSize, CACHE_SIZE),
  );
}
