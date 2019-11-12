/**
 * Registry.ts
 * @author Diao Zheng
 * @file A standard registry for static objects
 */

import _ from "lodash";
import { ensures, requires } from "./Contract";
import * as Option from "./Option";

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

  @requires(function(this: Registry<TKey, TValue>, key: TKey) {
    return !this.registeredKeys.has(key);
  }, "key not must be registered.")
  @requires(function(this: Registry<TKey, TValue>, __: TKey, fallback?: TKey) {
    return (!fallback) || this.registeredKeys.has(fallback);
  }, "fallback must be registered.")
  public addKey(key: TKey, fallback?: TKey) {
    this.registeredKeys.add(key);

    if (Option.isSome(fallback)) {
      this.fallback[key] = fallback;
    } else if (this.shouldProvideFallback) {
      this.fallback[key] = this.DEFAULT_VALUE;
    }
  }

  @requires(function(this: Registry<TKey, TValue>, key: TKey, __: TValue) {
    return this.registeredKeys.has(key);
  }, "key must be registered.")
  public updateValue(key: TKey, value: TValue) {
    this.registry[key] = value;
  }

  @requires(function(this: Registry<TKey, TValue>, key: TKey) {
    return this.registeredKeys.has(key);
  }, "key must be registered")
  public getValue(key: TKey): Option.Type<TValue> {
    return this.registry[key];
  }
  @requires(function(this: Registry<TKey, TValue>, key: TKey) {
    return this.registeredKeys.has(key);
  }, "key must be registered")
  @ensures((result: TValue) => Option.isSome(result), "value must be defined")
  public unsafeGetValue(key: TKey): TValue {
    return this.registry[key]!;
  }

  public mapValue<T>(key: TKey, f: (v: TValue) => T): Option.Type<T> {
    return Option.map(this.getValue(key), f);
  }

  public getValueRecursive = (key: TKey): Option.Type<TValue> => {
    return Option.value_(
      this.getValue(key),
      () => Option.map(this.fallback[key], this.getValueRecursive),
    );
  }

  public mapValueRecursive = <T>(
    key: TKey,
    f: (v: TValue) => T,
  ): Option.Type<T> => {
    return Option.value_(
      this.mapValue(key, f),
      () => Option.map(
        this.fallback[key] as Option.Type<TKey>,
        (fallback) => this.mapValueRecursive(fallback, f),
      ),
    );
  }

  @requires(function(
    this: Registry<TKey, TValue>,
    key: TKey,
    __: (obj: TValue) => void,
  ) {
    return this.registeredKeys.has(key);
  }, "key must be registered")
  public mutateValue(key: TKey, f: (obj: TValue) => void): boolean {
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
