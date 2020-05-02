/**
 * Hashing.test.ts
 * @author Diao Zheng
 * @file Hashing tests for Hashing
 */

import _ from "lodash";
import * as H from "../Hashing";
import { Unconstrained } from "../Types";

test("hash null, undefined", () => {
  let ctx = H.regenerateContext();
  while (ctx.null === ctx.undefined) {
    ctx = H.regenerateContext();
  }
  expect(H.hash(null, ctx)).not.toBe(H.hash(undefined, ctx));
});

test("hash true", () => {
  expect(H.hash(true)).not.toBe(H.hash(false));
  expect(H.hashPrimitive(true)).toBe(H.hash(true));
  expect(H.hashPrimitive(false)).toBe(H.hash(false));
  // tslint:disable-next-line:no-construct
  expect(H.hash(new Boolean(true))).toBe(H.hash(true));
  // tslint:disable-next-line:no-construct
  expect(H.hash(new Boolean(false))).toBe(H.hash(false));
});

describe("hash int", () => {
  const ctx = H.regenerateContext();

  test("0 is -0", () => {
    expect(H.hash(0, ctx)).toBe(H.hash(-0, ctx));
    expect(H.hashFloat(0, ctx)).not.toBe(H.hashFloat(-0, ctx));
  });

  test("NaN is the same", () => {
    const b = new Uint8Array(16);

    const shortView = new Uint16Array(b.buffer);
    const floatView = new Float64Array(b.buffer);

    b[0] = 1;
    b[1] = 2;

    const endianness = shortView[0] === 0x201 ? "little" : "big";

    // represent 0x7fffffffffffffff
    b[endianness === "little" ? 0 : 7] = 0xff;
    b[endianness === "little" ? 1 : 6] = 0xff;
    b[endianness === "little" ? 2 : 5] = 0xff;
    b[endianness === "little" ? 3 : 4] = 0xff;
    b[endianness === "little" ? 4 : 3] = 0xff;
    b[endianness === "little" ? 5 : 2] = 0xff;
    b[endianness === "little" ? 6 : 1] = 0xff;
    b[endianness === "little" ? 7 : 0] = 0x7f;

    expect(floatView[0]).toBeNaN();

    // represent 0xfff0000000000001
    b[8 + (endianness === "little" ? 0 : 7)] = 0x01;
    b[8 + (endianness === "little" ? 1 : 6)] = 0x00;
    b[8 + (endianness === "little" ? 2 : 5)] = 0x00;
    b[8 + (endianness === "little" ? 3 : 4)] = 0x00;
    b[8 + (endianness === "little" ? 4 : 3)] = 0x00;
    b[8 + (endianness === "little" ? 5 : 2)] = 0x00;
    b[8 + (endianness === "little" ? 6 : 1)] = 0xf0;
    b[8 + (endianness === "little" ? 7 : 0)] = 0xff;

    expect(floatView[1]).toBeNaN();

    expect(H.hash(floatView[0])).toBe(H.hash(floatView[1]));
    expect(H.hashFloat(floatView[0])).not.toBe(H.hashFloat(floatView[1]));
  });

  test("similar numbers should be different", () => {
    expect(H.hash(0, ctx)).not.toBe(H.hash(2, ctx));
  });

  test("large hashes", () => {
    expect(H.hash(Number.MAX_SAFE_INTEGER, ctx)).not.toBe(
      H.hash(Number.MAX_SAFE_INTEGER - 1),
    );
  });

  test("floating point", () => {
    expect(H.hash(0.1, ctx)).toBe(H.hash(0.2 / 2, ctx));
    expect(H.hash(Infinity, ctx)).not.toBe(H.hash(-Infinity, ctx));
    expect(H.hash(Infinity, ctx)).not.toBe(H.hash(NaN, ctx));
    expect(H.hash(1, ctx)).not.toBe(H.hashFloat(1, ctx));
    expect(H.hash(1.1, ctx)).toBe(H.hashFloat(1.1, ctx));
  });

  test("number object", () => {
    // tslint:disable-next-line:no-construct
    expect(H.hash(new Number(5))).toBe(H.hash(5));
  });
});

describe("string", () => {
  const ctx = H.regenerateContext();
  test("string equality", () => {
    expect(H.hash("1", ctx)).not.toBe(H.hash(1, ctx));
    expect(H.hash("12", ctx)).toBe(H.hash("1" + "2", ctx));
  });

  test("empty string", () => {
    expect(H.hash("", ctx)).not.toBe(H.hash(false, ctx));
  });

  test("string object", () => {
    // tslint:disable-next-line:no-construct
    expect(H.hash(new String("hello"), ctx)).toBe(H.hash("hello", ctx));
  });
});

describe("array", () => {
  const ctx = H.regenerateContext();

  test("empty array", () => {
    expect(H.hash([], ctx)).toBe(H.hash([], ctx));
  });

  test("array elem diff", () => {
    expect(H.hash([1], ctx)).not.toBe(H.hash([2], ctx));
  });

  test("array length diff", () => {
    expect(H.hash([1], ctx)).not.toBe(H.hash([1, Symbol()], ctx));
  });

  test("array symbol passthrough", () => {
    expect(H.hash([1, () => 0], ctx)).toBe(H.hash([1, Symbol()], ctx));
  });

  test("array is arraylike", () => {
    expect(H.hash({ 0: 1, 1: 2, length: 2 }, ctx)).toBe(H.hash([1, 2], ctx));
  });
});

describe("object", () => {
  const ctx = H.regenerateContext();

  test("empty object", () => {
    expect(H.hash({}, ctx)).toBe(H.hash(new Object(), ctx));
    expect(H.hash({}, ctx)).not.toBe(H.hash([], ctx));
  });

  test("object hash", () => {
    const obj: Unconstrained = { a: 1 };
    const hash1 = H.hash(obj, ctx);
    expect(hash1).not.toBe(H.hash({}, ctx));
    obj.a = "1";
    const hash2 = H.hash(obj, ctx);
    expect(hash1).not.toBe(hash2);
    obj.a = 1;
    expect(H.hash(obj, ctx)).toBe(hash1);
  });

  test("object key order", () => {
    expect(H.hash({a: 1, b: 1}, ctx)).toBe(H.hash({b: 1, a: 1}, ctx));
  });

  test("explicit undefined", () => {
    expect(H.hash({}, ctx)).toBe(H.hash({ a: undefined }, ctx));
  });

  test("symbol value passthrough", () => {
    expect(H.hash({ a: Symbol() }, ctx))
    .toBe(H.hash({ a: () => 1 }, ctx));
  });

  test("symbol key passthrough", () => {
    expect(H.hash({ [Symbol()]: 1 }, ctx)).toBe(H.hash({}, ctx));
  });
});

describe("hash semantics", () => {
  test("number", () => {
    expect(H.hash(1)).toBe(H.hashNumber(1));
    expect(H.hash(NaN)).toBe(H.hashNumber(NaN));
  });

  test("string", () => {
    expect(H.hash("")).toBe(H.hashString(""));
    // grinning face
    const face = String.fromCodePoint(0x1f600);
    expect(H.hash(face)).toBe(H.hashString(face));
    // tslint:disable-next-line:no-construct
    expect(H.hash(new String("hello world"))).toBe(H.hashString("hello world"));
  });

  test("primitive", () => {
    expect(H.hash(null)).toBe(H.hashPrimitive(null));
    expect(H.hash(true)).toBe(H.hashPrimitive(true));
    expect(H.hash(false)).toBe(H.hashPrimitive(false));
    expect(H.hash(undefined)).toBe(H.hashPrimitive(undefined));
  });

  test("array", () => {
    expect(H.hash([])).toBe(H.hashArray([]));
    expect(H.hash([1, 2, "boo"])).toBe(H.hashArray([1, 2, "boo"]));
  });

  test("object", () => {
    expect(H.hash({})).toBe(H.hashObject({}));
    expect(H.hash(H)).toBe(H.hashObject(H));
  });

  test("symbol", () => {
    expect(() => H.hash(Symbol())).toThrowError();
  });

  test("function", () => {
    expect(() => H.hash(test)).toThrowError();
  });
});

describe("hash context", () => {
  test("current context", () => {
    const exposedContext = H.UNSAFE_exposeCurrentContext();
    const currentContext = H.getCurrentContext();
    expect(exposedContext).toStrictEqual(currentContext);
    expect(exposedContext).not.toBe(currentContext);
  });

  test("regenerate context", () => {
    const exposedContext = H.UNSAFE_exposeCurrentContext();
    const prevContext = H.regenerateContext();
    expect(prevContext).toBe(exposedContext);
  });

  test("set context", () => {
    const exposedContext = H.UNSAFE_exposeCurrentContext();
    const newContext = _.merge({}, exposedContext);
    const prevContext = H.setContext(newContext);
    expect(prevContext).toBe(exposedContext);
    expect(H.UNSAFE_exposeCurrentContext()).toStrictEqual(newContext);
    expect(H.UNSAFE_exposeCurrentContext()).not.toBe(newContext);
  });

  test("explicit context check", () => {
    const prevContext = H.regenerateContext();
    expect(H.hash(0, prevContext)).toBe(H.hashNumber(0, prevContext));
    expect(H.hash(Infinity, prevContext))
      .toBe(H.hashFloat(Infinity, prevContext));

    expect(H.hash(null, prevContext)).toBe(H.hashPrimitive(null, prevContext));
    expect(H.hash(true, prevContext)).toBe(H.hashPrimitive(true, prevContext));
    expect(H.hash(undefined, prevContext))
      .toBe(H.hashPrimitive(undefined, prevContext));

    expect(H.hash("", prevContext)).toBe(H.hashString("", prevContext));
    expect(H.hash({}, prevContext)).toBe(H.hashObject({}, prevContext));
    expect(H.hash([], prevContext)).toBe(H.hashArray([], prevContext));
    // tslint:disable:no-construct
    expect(H.hash(new String("1"), prevContext))
      .toBe(H.hashString("1", prevContext));
    expect(H.hash(new Number(1), prevContext))
      .toBe(H.hashNumber(1, prevContext));
    expect(H.hash(new Number(1.017), prevContext))
      .toBe(H.hashNumber(1.017, prevContext));
    expect(H.hash(new Boolean(true), prevContext))
      .toBe(H.hashPrimitive(true, prevContext));
    // tslint:enable:no-construct
  });
});

describe("validate context", () => {
  const contextKeys = [
    "array",
    "bigint",
    "boolean",
    "float",
    "int",
    "nan",
    "null",
    "object",
    "string",
    "undefined",
  ];

  test("function and primitives are not valid contexts", () => {
    expect(H.validateContext(0)).toBe(false);
    expect(H.validateContext(() => 1)).toBe(false);
    expect(H.validateContext("hallo")).toBe(false);
    expect(H.validateContext(Symbol())).toBe(false);
  });

  test("arrays are not valid contexts", () => {
    expect(H.validateContext([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ])).toBe(false);
  });

  test("missing keys are not valid", () => {
    expect(H.validateContext({})).toBe(false);
    expect(H.validateContext({ a: 0 })).toBe(false);
    expect(H.validateContext({ a: 0, b: 0 })).toBe(false);
    expect(H.validateContext({ a: 0, b: 0, p: 0 })).toBe(false);

    const context: Record<string, number> = { a: 0, b: 0, p: 0 };

    for (const key of contextKeys) {
      expect(H.validateContext(context)).toBe(false);
      context[key] = 0;
    }
    expect(H.validateContext(context)).toBe(true);
  });
  test("non-numeric keys are not valid", () => {
    const base: Record<string, number> = {
      a: 0,
      b: 0,
      p: 0,

      array: 0,
      bigint: 0,
      boolean: 0,
      float: 0,
      int: 0,
      nan: 0,
      null: 0,
      object: 0,
      string: 0,
      undefined: 0,
    };
    expect(H.validateContext(base)).toBe(true);
    for (const key of contextKeys) {
      const context = {...base};
      context[key] += 0.1;
      expect(H.validateContext(context)).toBe(false);
    }
  });
});
