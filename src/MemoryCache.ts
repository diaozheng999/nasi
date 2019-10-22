/**
 * MemoryCache.ts
 * @author Diao Zheng
 * @file A simple in-memory cache that stores computed objects and somesuch.
 * @barrel export createMemoryCache
 */
import LRUCache from "lru-cache";
import { Disposable, IDisposable } from "./Disposable";
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
}

class MemoryCacheInternal implements IDisposable {

  public get currentSize() {
    return this.cache.itemCount;
  }

  public [Disposable.Instance] = new Disposable(this.clear.bind(this));

  private cache: LRUCache<number, ICacheLine<any, any>>;

  constructor(maxEntries: number) {
    this.cache = new LRUCache({
      max: maxEntries,
      maxAge: CACHE_DEFAULT_EXPIRY,
      dispose(__: number, cacheLine: ICacheLine<any, any>) {
        Disposable.tryDispose(cacheLine.value);
      },
    });
  }

  /**
   * Perform a set operation with a precomputed hash. Doing this will NOT
   * perform any collision avoidance.
   * @param key the precomputed hash
   * @param value the data to cache
   * @param expiry if present, the epoch (in ms) that the data will expire.
   * Defaults to 60 seconds from now.
   */
  public UNSAFE_set<T>(
    key: number,
    value: T,
    expiry?: number  | { age: number },
  ) {
    this.setInternal(
      key,
      key,
      value,
      this.mapExpiryToAge(expiry),
    );
  }

  /**
   * Updates the cache key with the said value. Note that this is dependent
   * on hash not colliding (which is unlikely).
   * @param key the key to store
   * @param value the data to cache
   * @param expiry if present, the epoch (in ms) that the data will expire.
   * Defaults to 60 seconds from now.
   */
  public set<T, K>(key: K, value: T, expiry?: number | { age: number }) {
    this.setInternal(
      Hashing.hash(key),
      key,
      value,
      this.mapExpiryToAge(expiry),
    );
  }

  /**
   * Returns the current cache line keyed by the precomputed hash. This will
   * not perform collision avoidance, but will remove the cache line should the
   * cache expires.
   * @param key the precomputed hash
   */
  public UNSAFE_getLine<T>(key: number): Option.Type<ICacheLine<T, any>> {
    return this.cache.get(key);
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
    this.cache.reset();
  }

  public UNSAFE_printAllCacheValues() {
    let output = "";
    this.cache.forEach((data, key) => {
      output += (
        `\nkey: ${key} (0x${key.toString(16)})\tvalue: ` +
        JSON.stringify(data, undefined, 2) + "\n"
      );
    });
    // tslint:disable-next-line: no-console
    console.warn(output);
  }

  private constructCacheLine<T, K>(
    key: number | K,
    value: T,
  ): ICacheLine<T, K> {
    return { key, value };
  }

  private mapExpiryToAge(expiry?: number | { age: number }) {
    switch (typeof expiry) {
      case "object":
        return expiry.age;

      default:
        return Option.map(expiry, (n) => n - Date.now());
    }
  }

  private setInternal(
    hash: number,
    key: any,
    value: any,
    age?: number,
  ) {
    this.cache.set(
      hash,
      this.constructCacheLine(key, value),
      Option.mapFinite(age),
    );
  }
}

export const MemoryCache = new MemoryCacheInternal(CACHE_SIZE);

export function createMemoryCache(cacheSize?: number) {
  return new MemoryCacheInternal(Option.value(cacheSize, CACHE_SIZE));
}
