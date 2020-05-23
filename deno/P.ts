/**
 * P.ts
 * @author Diao Zheng
 * @file Boolean logic with functions
 */

// @barrel export all
import uniq from "https://deno.land/x/lodash/uniq.js";
import * as F from "./F.ts";
import * as Option from "./Option.ts";
import * as Types from "./Types.ts";

type Predicate<T> = ((arg: T) => boolean);
type TypedPredicate<T, Q extends T> = (arg: T) => arg is Q;

export type Type<T> = Predicate<T>;

export type Typed<T, Q extends T> = TypedPredicate<T, Q>;

const NEGATE = Symbol("nasi/NEGATE");
const CONJUNCTION = Symbol("nasi/CONJUNCTION");
const DISJUNCTION = Symbol("nasi/DISJUNCTION");

type NegatedPredicate<T> = Predicate<T> & { [NEGATE]: NegatedPredicate<T> };
type ConjunctionPredicate<T> = Predicate<T> & {
  [CONJUNCTION]: Array<Predicate<T>>;
};
type DisjunctionPredicate<T> = Predicate<T> & {
  [DISJUNCTION]: Array<Predicate<T>>;
};

function isNegatable<T>(p: Predicate<T>): p is NegatedPredicate<T> {
  return p.hasOwnProperty(NEGATE);
}

function isConjunction<T>(p: Predicate<T>): p is ConjunctionPredicate<T> {
  return p.hasOwnProperty(CONJUNCTION);
}

function isDisjunction<T>(p: Predicate<T>): p is DisjunctionPredicate<T> {
  return p.hasOwnProperty(DISJUNCTION);
}

export function never(_pred: Types.Unconstrained): boolean {
  return false;
}

export function always(_pred: Types.Unconstrained): boolean {
  return true;
}

export function is<T>(obj: T): Predicate<T> {
  return (other) => Object.is(other, obj);
}

export function eq<T>(obj: T): Predicate<T> {
  return (other) => obj === other;
}

export function matches(regex: RegExp): Predicate<string> {
  return (s: string) => regex.test(s);
}

function boundConjunctionExecutor<T>(
  predicates: Array<Predicate<T>>,
  arg: T,
): boolean {
  for (const predicate of predicates) {
    if (!predicate(arg)) {
      return false;
    }
  }
  return true;
}

function boundDisjunctionExecutor<T>(
  predicates: Array<Predicate<T>>,
  arg: T,
): boolean {
  for (const predicate of predicates) {
    if (predicate(arg)) {
      return true;
    }
  }
  return false;
}

export function and<T, U extends T, V extends T>(
  p1: TypedPredicate<T, U>,
  p2: TypedPredicate<T, V>,
): TypedPredicate<T, U & V>;
export function and<T, U extends T, V extends T, W extends T>(
  p1: TypedPredicate<T, U>,
  p2: TypedPredicate<T, V>,
  p3: TypedPredicate<T, W>,
): TypedPredicate<T, U & V & W>;
export function and<T>(...predicates: Array<Predicate<T>>): Predicate<T>;
export function and<T>(...predicates: Array<Predicate<T>>): Predicate<T> {
  const filtered: Array<Predicate<T>> = [];

  for (const predicate of predicates) {
    if (predicate === never) {
      return never;
    } else if (predicate === always) {
      continue;
    } else if (isConjunction(predicate)) {
      filtered.push(...predicate[CONJUNCTION]);
    } else {
      filtered.push(predicate);
    }
  }

  const conjunction: Types.Unconstrained = boundConjunctionExecutor.bind<
    unknown,
    Array<Predicate<T>>,
    [T],
    boolean
  >(undefined, uniq(filtered));
  conjunction[CONJUNCTION] = filtered;

  return conjunction;
}

export function or<T>(...predicates: Array<Predicate<T>>): Predicate<T> {
  const filtered: Array<Predicate<T>> = [];

  for (const predicate of predicates) {
    if (predicate === always) {
      return always;
    } else if (predicate === never) {
      continue;
    } else if (isDisjunction(predicate)) {
      filtered.push(...predicate[DISJUNCTION]);
    } else {
      filtered.push(predicate);
    }
  }

  const disjunction: Types.Unconstrained = boundDisjunctionExecutor.bind<
    unknown,
    Array<Predicate<T>>,
    [T],
    boolean
  >(undefined, uniq(filtered));
  disjunction[DISJUNCTION] = filtered;

  return disjunction;
}

export function not<T, Q extends T>(
  predicate: Typed<T, Q>,
): Typed<T, Types.Not<T, Q>>;
export function not<T>(predicate: Predicate<T>): Predicate<T>;
export function not<T>(predicate: Predicate<T>): Predicate<T> {
  if (isNegatable(predicate)) {
    return predicate[NEGATE];
  }

  // see if it's a conjunction or disjunction
  if (isConjunction(predicate)) {
    const disjunction: Types.Unconstrained = or(
      ...predicate[CONJUNCTION].map(not),
    );
    disjunction[NEGATE] = predicate;
    (predicate as Types.Unconstrained)[NEGATE] = disjunction;
    return disjunction;
  } else if (isDisjunction(predicate)) {
    const conjunction: Types.Unconstrained = and(
      ...predicate[DISJUNCTION].map(not),
    );
    conjunction[NEGATE] = predicate;
    (predicate as Types.Unconstrained)[NEGATE] = conjunction;
    return conjunction;
  }

  const negate: Types.Unconstrained = (arg: T) => !predicate(arg);
  negate[NEGATE] = predicate;
  (predicate as NegatedPredicate<T>)[NEGATE] = negate;
  return negate;
}

export function infer<T>(
  precedant: Predicate<T>,
  antecedent: Predicate<T>,
): Predicate<T> {
  return or(not(precedant), antecedent);
}

export function branch<T, K extends T>(
  predicate: TypedPredicate<T, K>,
  ifTrue: Predicate<K>,
  ifFalse: Predicate<Types.Not<T, K>>,
): Predicate<T>;
export function branch<T>(
  predicate: Predicate<T>,
  ifTrue: Predicate<T>,
  ifFalse: Predicate<T>,
): Predicate<T>;
export function branch<T>(
  predicate: Predicate<T>,
  ifTrue: Predicate<T>,
  ifFalse: Types.Unconstrained,
): Predicate<T> {
  return (arg: T) => {
    if (predicate(arg)) {
      return ifTrue(arg);
    } else {
      return ifFalse(arg);
    }
  };
}
export function exists<T extends {}>(key: keyof T): Predicate<T> {
  return (obj: T) => Option.isSome(Option.property(obj, key));
}

export function existsWith<T extends {}, K extends keyof T>(
  key: K,
  predicate: Predicate<T[K]>,
): Predicate<T> {
  return (obj: T) =>
    Option.mapChoice(
      Option.property(obj, key),
      predicate,
      false,
    );
}

export function map<T, U extends T, V>(
  generateEvidence: (value: T) => V,
  verifier: Predicate<V>,
): TypedPredicate<T, U>;
export function map<T, U>(
  mapper: (value: T) => U,
  pred: Predicate<U>,
): Predicate<T>;
export function map<T, U>(
  mapper: (value: T) => U,
  pred: Predicate<U>,
): Predicate<T> {
  return F.compose(pred, mapper);
}

export function pred<T>(predicate: Predicate<T>): Predicate<T> {
  return F.memoise(predicate);
}

// we set never and always's negations to one another
(never as NegatedPredicate<Types.Unconstrained>)[NEGATE] =
  always as NegatedPredicate<Types.Unconstrained>;
(always as NegatedPredicate<Types.Unconstrained>)[NEGATE] =
  never as NegatedPredicate<Types.Unconstrained>;
