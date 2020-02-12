
/**
 * Lazy.ts
 * @author Diao Zheng
 * @file A Lazy (single) initialiser
 */

const UNINITIALISED = Symbol("LAZY_UNINITIALISED");

interface ILazy<T> {
  value: T;
}

export type Lazy<T> = ILazy<T>;

class LazyInternal<T> implements ILazy<T> {

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
