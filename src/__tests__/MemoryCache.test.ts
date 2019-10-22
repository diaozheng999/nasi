/**
 * MemoryCache.test.ts
 * @author Diao Zheng
 * @file Test cases for in-memory caching
 */

import * as Hashing from "../Hashing";
import { createMemoryCache } from "../MemoryCache";
import { createMemoryCacheLegacy } from "../MemoryCacheLegacy";

declare var global: any;
const memoizedDateConstructor = Date;

let currentDate = new memoizedDateConstructor().getTime();
const initialDate = new memoizedDateConstructor().getTime();

// tslint:disable-next-line: only-arrow-functions
global.Date = function(date?: any) {
  if (date === undefined) {
    return new memoizedDateConstructor(currentDate);
  }
  return new memoizedDateConstructor(date);
};

global.Date.now = () => currentDate;

beforeAll(() => {
  const context = Hashing.getCurrentContext();
  context.p = 4 as any; // not a prime, but ¯\_(ツ)_/¯
  context.a = 1 as any;
  context.b = 0 as any;
  context.int = 0 as any;
  Hashing.setContext(context);
});

beforeEach(() => {
  currentDate = initialDate;
});

test("simple caching", () => {
  const cache = createMemoryCache(4);
  expect(cache.get("key")).toBeUndefined();
  cache.set("key", "value");
  expect(cache.get("key")).toBe("value");
  expect(cache.currentSize).toBe(1);

  currentDate += 180000;

  expect(cache.get("key")).toBeUndefined();
  expect(cache.currentSize).toBe(0);
});

test("unsafe caching", () => {
  const cache = createMemoryCache(4);
  expect(cache.UNSAFE_get(0)).toBeUndefined();
  cache.UNSAFE_set(0, "value");
  expect(cache.UNSAFE_get(0)).toBe("value");
  expect(cache.currentSize).toBe(1);

  currentDate += 180000;

  expect(cache.UNSAFE_get(0)).toBeUndefined();
  expect(cache.currentSize).toBe(0);
});

test("cache trimming [LEGACY]", () => {
  const cache = createMemoryCacheLegacy(4);
  cache.set("key1", "value1");
  currentDate += 1000;
  cache.set("key2", "value2");
  currentDate += 1000;
  cache.set("key3", "value3");
  currentDate += 1000;
  cache.set("key4", "value4");
  currentDate += 1000;
  expect(cache.currentSize).toBe(4);
  cache.set("key6", "value5"); // "key5" collides with "key2" when P = 4
  expect(cache.currentSize).toBe(3);
  // we guarantee key5 is always in
  expect(cache.get("key6")).toBe("value5");
});

test("cache trimming with expiry [LEGACY]", () => {
  const cache = createMemoryCacheLegacy(4);
  cache.set("key1", "value1", currentDate);
  currentDate += 1000;
  cache.set("key2", "value2");
  currentDate += 1000;
  cache.set("key3", "value3");
  currentDate += 1000;
  cache.set("key4", "value4");
  currentDate += 1000;
  expect(cache.currentSize).toBe(4);
  cache.set("key6", "value5"); // "key5" collides with "key2" when P = 4
  // it can happen that expiry is the n/2-th item, in which case you don't have
  // any additional items.
  expect(cache.currentSize).toBe(2);
  // we guarantee key5 is always in
  expect(cache.get("key6")).toBe("value5");
});

test("unsafe cache updating", () => {
  const cache = createMemoryCache(4);
  cache.UNSAFE_set(0, "value1");
  currentDate += 1000;
  cache.UNSAFE_set(0, "value2");
  currentDate += 1000;
  expect(cache.UNSAFE_get(0)).toBe("value2");
  currentDate += 59000;
  expect(cache.UNSAFE_get(0)).toBe("value2");
  currentDate += 1000;
  expect(cache.UNSAFE_get(0)).toBeUndefined();
});

test("cache evict on collision", () => {
  const cache = createMemoryCache(4);
  cache.UNSAFE_set(0, "value1");
  cache.set("key0", "value2");
  expect(cache.UNSAFE_get(0)).toBeUndefined();
  expect(cache.get("key0")).toBe("value2");
});
