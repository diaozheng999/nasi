/**
 * Registry.ts
 * @author Diao Zheng
 * @file A standard registry for static objects
 */

import { invariant } from "./Contract.ts";
import * as Option from "./Option.ts";

export class Registry<TKey extends string | number | symbol, TValue> {
  public readonly shouldProvideFallback: boolean;
  public readonly DEFAULT_VALUE: TKey;

  private readonly registry: { [key in TKey]?: TValue } = {};
  private readonly fallback: { [key in TKey]?: TKey } = {};
  private readonly registeredKeys: Set<TKey> = new Set();

  constructor(
    defaultKey: TKey,
    defaultValue?: TValue,
    shouldProvideFallback?: boolean,
  ) {
    this.DEFAULT_VALUE = defaultKey;
    this.shouldProvideFallback = shouldProvideFallback ?? true;

    if (Option.isSome(defaultValue)) {
      this.registry[defaultKey] = defaultValue;
    }

    this.registeredKeys.add(defaultKey);
  }

  public addKey(key: TKey, fallback?: TKey) {
    invariant(
      () => !this.registeredKeys.has(key),
      "key not must be registered",
    );
    invariant(
      () => !fallback || this.registeredKeys.has(fallback),
      "fallback must be registered.",
    );

    this.registeredKeys.add(key);

    if (Option.isSome(fallback)) {
      this.fallback[key] = fallback;
    } else if (this.shouldProvideFallback) {
      this.fallback[key] = this.DEFAULT_VALUE;
    }
  }

  public updateValue(key: TKey, value: TValue) {
    invariant(() => this.registeredKeys.has(key), "key must be registered");
    this.registry[key] = value;
  }

  public getValue(key: TKey): Option.Type<TValue> {
    invariant(() => this.registeredKeys.has(key), "key must be registered");
    return this.registry[key];
  }

  public unsafeGetValue(key: TKey): TValue {
    invariant(() => this.registeredKeys.has(key), "key must be registered");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = this.registry[key]!;

    invariant(() => Option.isSome(result), "value must be defined");
    return result;
  }

  public mapValue<T>(key: TKey, f: (v: TValue) => T): Option.Type<T> {
    return Option.map(this.getValue(key), f);
  }

  public getValueRecursive = (key: TKey): Option.Type<TValue> => {
    return Option.value_(
      this.getValue(key),
      () => Option.map(this.fallback[key], this.getValueRecursive),
    );
  };

  public mapValueRecursive = <T>(
    key: TKey,
    f: (v: TValue) => T,
  ): Option.Type<T> => {
    return Option.value_(
      this.mapValue(key, f),
      () =>
        Option.map(
          this.fallback[key] as Option.Type<TKey>,
          (fallback) => this.mapValueRecursive(fallback, f),
        ),
    );
  };

  public mutateValue(key: TKey, f: (obj: TValue) => void): boolean {
    invariant(() => this.registeredKeys.has(key), "key must be registered");
    const output: Option.Type<TValue> = this.registry[key];
    if (Option.isSome(output)) {
      f(output);
      return true;
    }
    return false;
  }

  public keys() {
    return this.registeredKeys[Symbol.iterator]();
  }

  public UNSAFE_resetKeys() {
    this.registeredKeys.clear();
  }
}
