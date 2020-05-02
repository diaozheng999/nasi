/**
 * Hashing.ts
 * @author Diao Zheng
 * @file Provides simple hashing implementations for basic JavaScript types
 *
 * This is a simple (randomised) algorithm that guarantees 2-universality.
 * We strictly enable bitwise operators because we want to enforce that all
 * values should be between -2^30 and 2^30-1 because this is a valid tagged
 * integer for most JavaScript virtual machines. (The specific ones we're
 * interested in are V8 (for jest) and JavaScriptCore (react-native).)
 *
 * As such, we choose the word size, M = 2^29.
 *
 * Note that this hash is NOT cryptographically secure. It should be used
 * internally for diffing and caching purposes, as it should be faster than
 * cryptographically secure hashes.
 *
 * @barrel export all
 * @barrel export hash
 */

/* eslint-disable @typescript-eslint/no-use-before-define, no-magic-numbers */

// explicitly disable bitwise operator linting. I know what I'm doing here.
// tslint:disable:no-bitwise

import _ from "lodash";
import * as Integer from "./Integer";
import { Unconstrained } from './Types';

/**
 * A context that serves as the basis for our universal hashing algorithm.
 * The hashes generated are universal, and are solely deterministic based on
 * the randomly generated values given inside this object.
 */
export interface Context {
  /** the multiplier, (Range=[1, p)) */
  a: Integer.Type;
  /** the intercept, (Range=[0, p)) */
  b: Integer.Type;
  /** a prime >= M which serves as the finite field */
  p: Integer.Type;
  /** magic constant (Range=[0, p)) as starting point for undefined */
  undefined: Integer.Type;
  /** magic constant (Range=[0, p)) as starting point for null */
  null: Integer.Type;
  /** magic constant (Range=[0, p)) as starting point for boolean */
  boolean: Integer.Type;
  /** magic constant (Range=[0, p)) as starting point for integers */
  int: Integer.Type;
  /** magic constant (Range=[0, p)) as starting point for numbers */
  float: Integer.Type;
  /** magic constant (Range=[0, p)) as starting point for arrays */
  array: Integer.Type;
  /**
   * magic constant (Range=[0, p)) as starting point for objects, and as
   * replacements for Symbols and Functions in objects.
   */
  object: Integer.Type;
  /** magic constant (Range=[0, p)) as starting point for string */
  string: Integer.Type;
  /**
   * magic constant (Range=[0, p)) as starting point for bigint.
   * Not yet implemented.
   */
  bigint: Integer.Type;
  /** magic constant (Range=[0, p)) as starting point for the value NaN */
  nan: Integer.Type;
}

/**
 * M is the hashed universe size.
 * This is chosen to be 2^29 because we want to guarantee that we can find a
 * prime that's larger than this, as well as below the machine word size (31
 * bits)
 */
const M = 536870912;

/**
 * Number of buckets to hash to while hashing objects. This must be a power of
 * 2 due to internal optimisations.
 */
const OBJECT_KEY_BUCKET_SIZE_POWER_OF_2 = 32;

/**
 * This is the bitmask (so done because mod takes too long), this is defined
 * because:
 *   a mod 2^n === a & (2^n - 1)
 */
const OBJECT_KEY_BUCKET_MASK = OBJECT_KEY_BUCKET_SIZE_POWER_OF_2 - 1;

/**
 * a dense array of primes to pick from
 * http://compoasso.free.fr/primelistweb/page/prime/liste_online_en.php
 * We want to ensure the invariant that, for any p,
 * 2^30 >= p >= M.
 */
const P: Integer.Type[] = [
  1073737591 | 0, 1073737597 | 0, 1073737619 | 0, 1073737627 | 0,
  1073737631 | 0, 1073737661 | 0, 1073737703 | 0, 1073737711 | 0,
  1073737723 | 0, 1073737771 | 0, 1073737829 | 0, 1073737837 | 0,
  1073737877 | 0, 1073737879 | 0, 1073737909 | 0, 1073737939 | 0,
  1073737943 | 0, 1073737967 | 0, 1073737981 | 0, 1073738011 | 0,
  1073738101 | 0, 1073738117 | 0, 1073738119 | 0, 1073738143 | 0,
  1073738161 | 0, 1073738189 | 0, 1073738191 | 0, 1073738219 | 0,
  1073738243 | 0, 1073738249 | 0, 1073738269 | 0, 1073738273 | 0,
  1073738297 | 0, 1073738321 | 0, 1073738353 | 0, 1073738383 | 0,
  1073738387 | 0, 1073738441 | 0, 1073738503 | 0, 1073738521 | 0,
  1073738563 | 0, 1073738579 | 0, 1073738623 | 0, 1073738651 | 0,
  1073738671 | 0, 1073738711 | 0, 1073738737 | 0, 1073738741 | 0,
  1073738747 | 0, 1073738753 | 0, 1073738789 | 0, 1073738801 | 0,
  1073738807 | 0, 1073738821 | 0, 1073738843 | 0, 1073738863 | 0,
  1073738867 | 0, 1073738903 | 0, 1073738917 | 0, 1073738929 | 0,
  1073738933 | 0, 1073738951 | 0, 1073738957 | 0, 1073738977 | 0,
  1073738983 | 0, 1073739041 | 0, 1073739059 | 0, 1073739067 | 0,
  1073739089 | 0, 1073739101 | 0, 1073739143 | 0, 1073739151 | 0,
  1073739167 | 0, 1073739169 | 0, 1073739179 | 0, 1073739187 | 0,
  1073739307 | 0, 1073739311 | 0, 1073739313 | 0, 1073739347 | 0,
  1073739353 | 0, 1073739361 | 0, 1073739367 | 0, 1073739379 | 0,
  1073739421 | 0, 1073739437 | 0, 1073739449 | 0, 1073739451 | 0,
  1073739473 | 0, 1073739493 | 0, 1073739523 | 0, 1073739559 | 0,
  1073739577 | 0, 1073739599 | 0, 1073739617 | 0, 1073739619 | 0,
  1073739631 | 0, 1073739649 | 0, 1073739679 | 0, 1073739683 | 0,
  1073739721 | 0, 1073739739 | 0, 1073739749 | 0, 1073739767 | 0,
  1073739817 | 0, 1073739853 | 0, 1073739859 | 0, 1073739881 | 0,
  1073739883 | 0, 1073739893 | 0, 1073739911 | 0, 1073739917 | 0,
  1073739937 | 0, 1073739949 | 0, 1073739983 | 0, 1073740013 | 0,
  1073740049 | 0, 1073740061 | 0, 1073740067 | 0, 1073740079 | 0,
  1073740123 | 0, 1073740127 | 0, 1073740133 | 0, 1073740139 | 0,
  1073740147 | 0, 1073740163 | 0, 1073740177 | 0, 1073740183 | 0,
  1073740189 | 0, 1073740201 | 0, 1073740249 | 0, 1073740379 | 0,
  1073740391 | 0, 1073740403 | 0, 1073740439 | 0, 1073740463 | 0,
  1073740477 | 0, 1073740489 | 0, 1073740501 | 0, 1073740517 | 0,
  1073740523 | 0, 1073740529 | 0, 1073740537 | 0, 1073740541 | 0,
  1073740543 | 0, 1073740567 | 0, 1073740571 | 0, 1073740609 | 0,
  1073740649 | 0, 1073740691 | 0, 1073740693 | 0, 1073740697 | 0,
  1073740781 | 0, 1073740783 | 0, 1073740793 | 0, 1073740807 | 0,
  1073740819 | 0, 1073740847 | 0, 1073740853 | 0, 1073740879 | 0,
  1073740909 | 0, 1073740933 | 0, 1073740951 | 0, 1073740963 | 0,
  1073741047 | 0, 1073741077 | 0, 1073741101 | 0, 1073741173 | 0,
  1073741189 | 0, 1073741197 | 0, 1073741213 | 0, 1073741237 | 0,
  1073741287 | 0, 1073741309 | 0, 1073741311 | 0, 1073741329 | 0,
  1073741371 | 0, 1073741381 | 0, 1073741387 | 0, 1073741399 | 0,
  1073741419 | 0, 1073741441 | 0, 1073741467 | 0, 1073741477 | 0,
  1073741503 | 0, 1073741527 | 0, 1073741561 | 0, 1073741567 | 0,
  1073741621 | 0, 1073741651 | 0, 1073741663 | 0, 1073741671 | 0,
] as Unconstrained;

/**
 * Generate a random number in the field [n] almost uniformly.
 * @param fieldSize n (This is required to be a int31. However, the type
 * definitions are relaxed to avoid extreneous typecasting in the following
 * code, since this function is not exported anyway.)
 */
function randomInt(fieldSize: number): Integer.Type {
  return Integer.UNSAFE_ofNumber(((Math.random() * fieldSize) | 0) % fieldSize);
}

/**
 * Generates a context for our hash function. This is equivalent to picking
 * a random hash in the hash family.
 */
export function generateContext(): Context {
  // We know that P's length is always within safe range.
  // Implementation note: MAKE SURE THAT IT IS.
  const i = randomInt(P.length);
  const p = P[i];
  const a = Integer.UNSAFE_ofNumber(randomInt(p - 1) + 1);
  const b = randomInt(p);

  const initialValues = {
    array: randomInt(p),
    bigint: randomInt(p),
    boolean: randomInt(p),
    float: randomInt(p),
    int: randomInt(p),
    nan: randomInt(p),
    null: randomInt(p),
    object: randomInt(p),
    string: randomInt(p),
    symbol: randomInt(p),
    undefined: randomInt(p),
  };

  return { p, a, b, ...initialValues };
}

/**
 * Rotates a 31-bit number to the left by 27 bits, e.g.
 *
 *           3         2         1         0
 *   rot27( 10111011010100111111001010101010 )
 *        = 01010111011010100111111001010101
 *
 * @param x the number to be rotated.
 * @returns the rotated number.
 */
function rot27(x: Integer.Type): Integer.Type {
  return (((x << 27) ^ (x >> 3)) & Integer.INT_MAX) as Integer.Type;
}

/** The stored current internal context */
let context: Context = generateContext();

/**
 * Hashes a current machine word using the given context. This function is only
 * defined if the machine word in question is an integer. Undefined behaviour
 * will result if x is not a valid integer.
 *
 * Also note that should x not be a 31-bit machine word, then the speed of this
 * function may be slowed down on 32-bit systems.
 *
 * @param x a 31-bit machine word to be hashed.
 * @param ctx the context on which to hash.
 * @returns the hashed machine word.
 */
export function UNSAFE_hash(x: number, ctx: Context): Integer.Type {
  return (((ctx.a * x) + ctx.b) % ctx.p) % M as Integer.Type;
}

/**
 * Regenerates a context for the internal hashing function.
 * @returns the previously used context.
 */
export function regenerateContext(): Context {
  const previousContext = context;
  context = generateContext();
  return previousContext;
}

/**
 * Updates the current context with a copy of the given context.
 * @param ctx The context to be set
 * @returns the previously used context.
 */
export function setContext(ctx: Context): Context {
  const previousContext = context;
  context = _.merge({}, ctx);
  return previousContext;
}

/**
 * Hashes a buffer using a given buffer and initial value. This algorithm
 * is O(n) worst-time on the buffer size. This algorithm assumes machine
 * endianness. This algorithm walks the buffer from left to right with stride
 * of 4 bytes, so make sure that buffer is a proper multiple.
 * @param buffer the length of the buffer. Ensure that byte length is a multiple
 * of 4.
 * @param initValue a 31-bit machine word that represents the initial value to
 * hash from
 * @param ctx the context to which the value is hashed.
 */
export function UNSAFE_hashBuffer(
  buffer: ArrayBuffer,
  initValue: Integer.Type,
  ctx: Context,
): Integer.Type {
  const view = new Uint32Array(buffer);
  const len = view.length;
  let acc = initValue;
  for (let i = 0; i < len; ++i) {
    const x = rot27(acc) ^ view[i];
    acc = UNSAFE_hash(x, ctx);
  }
  return acc;
}

/**
 * Hashes a string using a given context
 * @param s The string to hash
 * @param ctx An optional context to use. If not provided, will use the current
 * stored context.
 */
export function hashString(s: string, ctx: Context = context): Integer.Type {
  // instead of explicitly creating a buffer, we simply iterate through charCode
  const len = s.length;
  let acc = ctx.string;
  for (let i = 0; i < len; ++i) {
    const x = rot27(acc) ^ s.charCodeAt(i);
    acc = UNSAFE_hash(x, ctx);
  }
  return acc;
}
/**
 * Hashes a JavaScript number as a floating point. This hash function differs
 * from `hashNumber` regarding the following:
 * 1. Representations of `NaN` hash to different values. (e.g.
 * h(0x7ff0....0) != h(0x7fff....f))
 * 2. `0` and `-0` are hashed to different values.
 * 3. Does not distinguish between integers and floats. All values are hashed
 * as floats.
 * @param n the number to be hashed
 * @param ctx if provided, this context will be used. Otherwise, will use the
 * current stored context.
 */
export function hashFloat(n: number, ctx: Context = context): Integer.Type {
  const q = new Float64Array(1);
  q[0] = n;
  return UNSAFE_hashBuffer(q.buffer, ctx.float, ctx);
}

/**
 * Hashes a JavaScript number. This hash function has the following properties:
 * 1. All representations of `NaN` hash to the same value.
 * 2. `0` and `-0` hash to the same value.
 * 3. Integers are hashed with a different algorithm than floats.
 *
 * @param n the number to be hashed.
 * @param ctx if provided, this context will be used. Otherwise, will use the
 * current stored context.
 */
export function hashNumber(n: number, ctx: Context = context): Integer.Type {
  if (Number.isNaN(n)) {
    return UNSAFE_hash(ctx.nan, ctx);
  }
  // if n is a machine word, simply hash

  // note the unary plus "coalescing operator". This is to convert a number
  // object to a number.
  if (Number.isInteger(+n)) {
    // we want to make sure that we always hash a value that is within
    // the machine word boundary.
    if (n <= Integer.INT_MAX && n >= Integer.INT_MIN) {
      // note that both 0 and -0 has the property that they are integers
      // and they're between INT_MIN and INT_MAX. Thus, they will be hashed
      // to the same value.
      return UNSAFE_hash(ctx.int ^ n, ctx);
    } else {
      // n has between 31 bits and 52 bits
      const lower = n & Integer.INT_MAX;
      const upper = n >> 31;
      return UNSAFE_hash(rot27((ctx.int ^ lower) as Integer.Type) ^ upper, ctx);
    }
  }
  return hashFloat(n, ctx);
}

/**
 * Hashes a "primitive" value, here boolean, undefined and null to their
 * respective counterparts.
 * @param prim the "primitive" value to be hashed.
 * @param ctx if provided, this context will be used. Otherwise, will use the
 * current stored context.
 */
export function hashPrimitive(
  prim: boolean | undefined | null,
  ctx: Context = context,
): Integer.Type {
  if (prim === null) {
    return UNSAFE_hash(ctx.null, ctx);
  }
  if (prim === undefined) {
    return UNSAFE_hash(ctx.undefined, ctx);
  }
  // (prim | 0) returns 1 if prim is true, 0 if prim is false.
  // we use the standard integer hashing alg. to ensure that these two are
  // always different
  return UNSAFE_hash(ctx.boolean ^ (prim as Unconstrained | 0), ctx);
}

/**
 * Hashes an array or arraylike.
 * @param arr An array-like to hash. Note that string objects hashed with this
 * function returns a different value than `hashString`.
 * @param ctx if provided, this context will be used. Otherwise, will use the
 * current stored context.
 */
export function hashArray(
  arr: ArrayLike<unknown>,
  ctx: Context = context,
): Integer.Type {
  const length = arr.length;

  const hashedLength = hashNumber(length, ctx);
  let acc = Integer.UNSAFE_ofNumber(ctx.array ^ hashedLength);
  for (let i = 0; i < length; ++i) {
    // we want to explicitly remove functions and symbols
    switch (typeof arr[i]) {
      case "symbol":
      case "function":
        acc = UNSAFE_hash(rot27(acc) ^ ctx.array, ctx);
        break;
      default:
        const x = rot27(acc) ^ hash(arr[i], ctx);
        acc = UNSAFE_hash(x, ctx);
    }
  }
  return acc;
}

function typedKeyof<T>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Unconstrained;
}

/**
 * Hashes an object. Note that this function uses `hash` function for
 * recursively hashing members. Values generated using hashObject for `null`,
 * string objects and arrays differ from values generated using `hash`.
 * @param obj The object to hash
 * @param ctx if provided, this context will be used. Otherwise, will use the
 * current stored context.
 */
export function hashObject<K extends {}>(
  obj: K,
  ctx: Context = context,
): Integer.Type {
  const keys: Array<keyof K> = typedKeyof(obj);
  const buffer = new Int32Array(OBJECT_KEY_BUCKET_SIZE_POWER_OF_2);

  for (const key of keys) {
    const loc = hashString(`${key}`, ctx) & OBJECT_KEY_BUCKET_MASK;
    const staged = rot27(hashString(`${key}`, ctx));
    switch (typeof obj[key]) {
      case "undefined":
        continue;
      case "function":
      case "symbol":
        buffer[loc] ^= UNSAFE_hash(staged ^ ctx.object, ctx);
        break;
      default:
        const x = hash(obj[key], ctx);
        buffer[loc] ^= UNSAFE_hash(staged ^ x, ctx);
    }
  }

  return UNSAFE_hashBuffer(buffer.buffer, ctx.object, ctx);
}

/**
 * Hashes an object to a number. Does not hash functions, symbols or bignums.
 * Hashing a top-level symbol or function will result in a TypeError being
 * thrown, hashing a symbol or bignum in an array or object value will result
 * in that value being replaced with a default value (i.e. all symbols and
 * functions hash to the same value), and setting a symbol as a object key
 * will result in that key and value being ignored in the hashing process.
 * @param obj the object to hash
 * @param ctx if provided, this context will be used. Otherwise, will use the
 * current stored context.
 */
export function hash(obj: Unconstrained, ctx: Context = context): Integer.Type {
  switch (typeof obj) {
    case "number":
      return hashNumber(obj, ctx);
    case "string":
      return hashString(obj, ctx);
    case "boolean":
    case "undefined":
      return hashPrimitive(obj, ctx);
    case "function":
    case "symbol":
      throw new TypeError(
        "Cannot provide persistence guarantees for runtime values. (Trying " +
        "to hash function or symbol)",
      );

    case "object":
      if (!obj) {
        return hashPrimitive(obj, ctx);
      }

      // although we explicitly disabled number/string objects, but it's
      // possible that some idiots may produce that for hashing. As such,
      // a simple typeof guard is not enough, and we need to explicitly check
      // if that value is a number object or string object.

      if (_.isBoolean(obj)) {
        return hashPrimitive(obj, ctx);
      }

      if (_.isNumber(obj)) {
        return hashNumber(obj, ctx);
      }

      if (_.isString(obj)) {
        return hashString(obj, ctx);
      }

      if (_.isArrayLike(obj)) {
        return hashArray(obj, ctx);
      }

      return hashObject(obj, ctx);
    default:
      throw new Error("Encountered implementation-specific type.");
  }
}

/**
 * Exposes the actual context object used by the hash function. Note that
 * updating this value will inadvertently cause all hashes to not equal to
 * previous hashes. If you need to get the current context to perform certain
 * actions, please use `getCurrentContext` instead.
 * @returns the current context object
 */
export function UNSAFE_exposeCurrentContext(): Context {
  return context;
}

/**
 * Provides a copy of the current context used by the hash function.
 * @returns a copy of the cuurrent context object
 */
export function getCurrentContext(): Context {
  return _.merge({}, context);
}

export function validateContext(ctx: Unconstrained): ctx is Context {
  if (typeof ctx !== "object") {
    return false;
  }
  const c: Context = ctx;
  return (
    typeof c.a === "number" && (c.a | 0) === c.a &&
    typeof c.b === "number" && (c.b | 0) === c.b &&
    typeof c.p === "number" && (c.p | 0) === c.p &&
    typeof c.array === "number" && (c.array | 0) === c.array &&
    typeof c.bigint === "number" && (c.bigint | 0) === c.bigint &&
    typeof c.boolean === "number" && (c.boolean | 0) === c.boolean &&
    typeof c.float === "number" && (c.float | 0) === c.float &&
    typeof c.int === "number" && (c.int | 0) === c.int &&
    typeof c.nan === "number" && (c.nan | 0) === c.nan &&
    typeof c.null === "number" && (c.null | 0) === c.null &&
    typeof c.object === "number" && (c.object | 0) === c.object &&
    typeof c.string === "number" && (c.string | 0) === c.string &&
    typeof c.undefined === "number" && (c.undefined | 0) === c.undefined
  );
}
