/**
 * F.ts
 * @author Diao Zheng
 * @file Functional utilities
 */
import { isNone, Type as Option, value_ } from "./Option.ts";
import { AnyArray, Unconstrained } from "./Types.ts";
type Func<TArgs extends AnyArray, TReturn> = (...args: TArgs) => TReturn;
export type Type<TArgs extends AnyArray, TReturn> = Func<TArgs, TReturn>;
export type Predicate<T> = Func<[T], boolean>;
const CHAIN_HEAD = Symbol("nasi/CHAIN_HEAD");
const CHAIN_TAIL = Symbol("nasi/CHAIN_TAIL");
const MEMO = Symbol("nasi/MEMO");
const UNIT = Symbol("nasi/UNIT");
export type MemoisedFunc<TArgs extends AnyArray, TReturn> = Func<
  TArgs,
  TReturn
> & {
  [MEMO]: Map<unknown, unknown>;
};
type ChainedFunc<TArgs extends AnyArray, TIntermediate, TReturn> = Func<
  TArgs,
  TReturn
> & {
  [CHAIN_HEAD]: Func<TArgs, TIntermediate>;
  [CHAIN_TAIL]: Func<[TIntermediate], TReturn>;
};
function isChained<TArgs extends AnyArray, TIntermediate, TReturn>(
  f: Func<TArgs, TReturn>
): f is ChainedFunc<TArgs, TIntermediate, TReturn> {
  return f.hasOwnProperty(CHAIN_HEAD);
}
function isMemoised<TArgs extends AnyArray, TReturn>(
  f: Func<TArgs, TReturn>
): f is MemoisedFunc<TArgs, TReturn> {
  return f.hasOwnProperty(MEMO);
}
function normalise<TArgs extends AnyArray, TReturn>(
  f: Func<TArgs, TReturn>
): Func<TArgs, TReturn> {
  if (isChained(f)) {
    // mutual recursion
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return chain(f[CHAIN_HEAD], normalise(f[CHAIN_TAIL]));
  }
  return f;
}
function chain<TArgs extends AnyArray, TIntermediate, TReturn>(
  f1: Func<TArgs, TIntermediate>,
  f2: Func<[TIntermediate], TReturn>
): Func<TArgs, TReturn> {
  // assert that f1 is not a chained function
  if (isChained(f1)) {
    return chain(f1[CHAIN_HEAD], chain(f1[CHAIN_TAIL], f2));
  }
  const normalisedF2 = normalise(f2);
  const chained = (...args: TArgs) => {
    return normalisedF2(f1(...args));
  };
  const chainedWithMetadata: ChainedFunc<
    TArgs,
    TIntermediate,
    TReturn
  > = chained as Unconstrained;
  chainedWithMetadata[CHAIN_HEAD] = f1;
  chainedWithMetadata[CHAIN_TAIL] = f2;
  return chainedWithMetadata;
}
export function compose<TArgs extends AnyArray, TIntermediate, TReturn>(
  f1: Func<[TIntermediate], TReturn>,
  f2: Func<TArgs, TIntermediate>
) {
  return chain(f2, f1);
}
export function pipe<TArgs extends AnyArray, TIntermediate, TReturn>(
  f1: Func<TArgs, TIntermediate>,
  f2: Func<[TIntermediate], TReturn>
) {
  return chain(f1, f2);
}
function getMap<TArgs extends AnyArray, TReturn>(
  memoised: Map<Unconstrained, Unconstrained>,
  args: TArgs
): Map<typeof UNIT, TReturn> {
  let current = memoised;
  for (const arg of args) {
    const staged = current.get(arg);
    if (isNone(staged)) {
      const newMap = new Map();
      current.set(arg, newMap);
      current = newMap;
    } else {
      current = staged;
    }
  }
  return current;
}
function getFromMemoisation<TArgs extends AnyArray, TReturn>(
  memoised: Map<Unconstrained, Unconstrained>,
  args: TArgs
): Option<TReturn> {
  const map = getMap<TArgs, TReturn>(memoised, args);
  return map.get(UNIT);
}
function updateMemoisation<TArgs extends AnyArray, TReturn>(
  memoised: Map<Unconstrained, Unconstrained>,
  args: TArgs,
  value: TReturn
) {
  const map = getMap<TArgs, TReturn>(memoised, args);
  return map.set(UNIT, value);
}
function memoisedExecutor<TArgs extends AnyArray, TReturn>(
  memoised: Map<TArgs, TReturn>,
  func: Func<TArgs, TReturn>,
  ...args: TArgs
): TReturn {
  return value_(getFromMemoisation(memoised, args), () => {
    const result = func(...args);
    updateMemoisation(memoised, args, result);
    return result;
  });
}
export function memoise<TArgs extends AnyArray, TReturn>(
  func: Func<TArgs, TReturn>
): MemoisedFunc<TArgs, TReturn> {
  if (!isMemoised(func)) {
    const memo = new Map<TArgs, TReturn>();
    const memoised: Unconstrained = memoisedExecutor.bind<
      Unconstrained,
      Map<TArgs, TReturn>,
      Func<TArgs, TReturn>,
      TArgs,
      TReturn
    >(undefined, memo, func);
    memoised[MEMO] = memo;
    return memoised;
  }
  return func;
}
export function curry<T1, TArgs extends AnyArray, TReturn>(
  f: (arg0: T1, ...args: TArgs) => TReturn
): Func<[T1], Func<TArgs, TReturn>> {
  return (arg0) => (...rest) => f(arg0, ...rest);
}
export function curry2<T0, T1, TArgs extends AnyArray, TReturn>(
  f: (arg0: T0, arg1: T1, ...args: TArgs) => TReturn
): Func<[T0, T1], Func<TArgs, TReturn>> {
  return (arg0, arg1) => (...rest) => f(arg0, arg1, ...rest);
}
export function curryRight<T0, T1, TArgs extends AnyArray, TReturn>(
  f: (arg0: T0, arg1: T1, ...args: TArgs) => TReturn
): Func<[T1], (arg0: T0, ...args: TArgs) => TReturn> {
  return (arg1) => (arg0, ...rest) => f(arg0, arg1, ...rest);
}
export function ctor<TArgs extends AnyArray, TReturn>(
  ctor: new (...args: TArgs) => TReturn
): Func<TArgs, TReturn> {
  return (...args) => new ctor(...args);
}
