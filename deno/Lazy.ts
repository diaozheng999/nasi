/**
 * Lazy.ts
 * @author Diao Zheng
 * @file A Lazy (single) initialiser
 */

const UNINITIALISED = Symbol("LAZY_UNINITIALISED");

export interface Lazy<T> {
  value: T;
}

class LazyInternal<T> implements Lazy<T> {
  private sharedValue: T | typeof UNINITIALISED = UNINITIALISED;
  private init: () => T;

  constructor(init: () => T) {
    this.init = init;
  }

  public get value() {
    if (this.sharedValue === UNINITIALISED) {
      const sharedValue = this.init();
      this.sharedValue = sharedValue;
      return sharedValue;
    }
    return this.sharedValue;
  }
}

export function Lazy<T>(constructor: () => T): Lazy<T> {
  return new LazyInternal(constructor);
}
