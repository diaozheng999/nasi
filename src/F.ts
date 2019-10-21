/**
 * F.ts
 * @author Diao Zheng
 * @file Functional utilities
 */

// @barrel export all

type Func<TArgs extends any[], TReturn> = (...args: TArgs) => TReturn;

export type Type<TArgs extends any[], TReturn> = Func<TArgs, TReturn>;

export type Predicate<T> = Func<[T], boolean>;

const CHAIN_HEAD = Symbol("nasi/CHAIN_HEAD");
const CHAIN_TAIL = Symbol("nasi/CHAIN_TAIL");

type ChainedFunc<TArgs extends any[], TIntermediate, TReturn> =
  Func<TArgs, TReturn> & {
    [CHAIN_HEAD]: Func<TArgs, TIntermediate>,
    [CHAIN_TAIL]: Func<[TIntermediate], TReturn>,
  };

function isChained<TArgs extends any[], TIntermediate, TReturn>(
  f: Func<TArgs, TReturn>,
): f is ChainedFunc<TArgs, TIntermediate, TReturn> {
  return f.hasOwnProperty(CHAIN_HEAD);
}

function normalise<TArgs extends any[], TReturn>(
  f: Func<TArgs, TReturn>,
): Func<TArgs, TReturn> {
  if (isChained(f)) {
    return chain(f[CHAIN_HEAD], normalise(f[CHAIN_TAIL]));
  }
  return f;
}

function chain<TArgs extends any[], TIntermediate, TReturn>(
  f1: Func<TArgs, TIntermediate>,
  f2: Func<[TIntermediate], TReturn>,
): Func<TArgs, TReturn> {
  // assert that f1 is not a chained function
  if (isChained(f1)) {
    return chain(f1[CHAIN_HEAD], chain(f1[CHAIN_TAIL], f2));
  }

  const normalisedF2 = normalise(f2);

  const chained = (...args: TArgs) => {
    return normalisedF2(f1(...args));
  };

  const chainedWithMetadata: ChainedFunc<TArgs, TIntermediate, TReturn> =
    chained as any;

  chainedWithMetadata[CHAIN_HEAD] = f1;
  chainedWithMetadata[CHAIN_TAIL] = f2;

  return chainedWithMetadata;
}

export function compose<TArgs extends any[], TIntermediate, TReturn>(
  f1: Func<[TIntermediate], TReturn>,
  f2: Func<TArgs, TIntermediate>,
) {
  return chain(f2, f1);
}

export function pipe<TArgs extends any[], TIntermediate, TReturn>(
  f1: Func<TArgs, TIntermediate>,
  f2: Func<[TIntermediate], TReturn>,
) {
  return chain(f1, f2);
}
