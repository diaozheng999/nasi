/**
 * P.ts
 * @author Diao Zheng
 * @file Boolean logic with functions
 */

// @barrel export all
import _ from "lodash";
import * as F from "./F";
import * as Option from "./Option";
import * as Types from "./Types";

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

export function never(__: any): boolean {
  return false;
}

export function always(__: any): boolean {
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
    const disjunction: any = or(...predicate[CONJUNCTION].map(not));
    disjunction[NEGATE] = predicate;
    (predicate as any)[NEGATE] = disjunction;
    return disjunction;
  } else if (isDisjunction(predicate)) {
    const conjunction: any = and(...predicate[DISJUNCTION].map(not));
    conjunction[NEGATE] = predicate;
    (predicate as any)[NEGATE] = conjunction;
    return conjunction;
  }

  const negate: any = (arg: T) => !predicate(arg);
  negate[NEGATE] = predicate;
  (predicate as NegatedPredicate<T>)[NEGATE] = negate;
  return negate;
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

  let conjunction: any;
  conjunction = boundConjunctionExecutor.bind<
    unknown,
    Array<Predicate<T>>,
    [T],
    boolean
  >(undefined, _.uniq(filtered));
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

  let disjunction: any;
  disjunction = boundDisjunctionExecutor.bind<
    unknown,
    Array<Predicate<T>>,
    [T],
    boolean
  >(undefined, _.uniq(filtered));
  disjunction[DISJUNCTION] = filtered;

  return disjunction;
}

export function infer<T>(
  precedant: Predicate<T>,
  antecedent: Predicate<T>,
): Predicate<T> {
  return or(not(precedant), antecedent);
}

export function branch<T>(
  predicate: Predicate<T>,
  ifTrue: Predicate<T>,
  ifFalse: Predicate<T>,
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
  return (obj: T) => Option.mapChoice(
    Option.property(obj, key),
    predicate,
    false,
  );
}

export function pred<T>(predicate: Predicate<T>): Predicate<T> {
  return F.memoise(predicate);
}

// we set never and always's negations to one another
(never as NegatedPredicate<any>)[NEGATE] = always as NegatedPredicate<any>;
(always as NegatedPredicate<any>)[NEGATE] = never as NegatedPredicate<any>;
