/**
 * Option.test.ts
 * @author Diao Zheng
 * @file Unit tests for src/Core/Option.ts
 */
// tslint:disable-next-line:no-reference
/// <reference path="../../node_modules/@types/jest/index.d.ts" />

import * as Option from "../Option";

// isSome

test("isSome false", () => {
  expect(Option.isSome(undefined)).toBe(false);
});
test("isSome null", () => {
  expect(Option.isSome(null)).toBe(true);
});

test("isSome falsy", () => {
  expect(Option.isSome(NaN)).toBe(true);
});

test("isSome truthy", () => {
  expect(Option.isSome(1)).toBe(true);
});

test("isSome falsy 2", () => {
  expect(Option.isSome(0)).toBe(true);
});

test("isSome object", () => {
  expect(Option.isSome({})).toBe(true);
});

test("isSome some", () => {
  expect(Option.isSome(Option.some(null))).toBe(true);
});

test("isSome none", () => {
  expect(Option.isSome(Option.none())).toBe(false);
});

// isNone

test("isNone undefined", () => {
  expect(Option.isNone(undefined)).toBe(true);
});

test("isNone null", () => {
  expect(Option.isNone(null)).toBe(false);
});

test("isNone falsy", () => {
  expect(Option.isNone(NaN)).toBe(false);
});

test("isNone truthy", () => {
  expect(Option.isNone(1)).toBe(false);
});

test("isNone falsy 2", () => {
  expect(Option.isNone(0)).toBe(false);
});

test("isNone object", () => {
  expect(Option.isNone({})).toBe(false);
});

test("isNone some", () => {
  expect(Option.isNone(Option.some(""))).toBe(false);
});

test("isNone none", () => {
  expect(Option.isNone(Option.none())).toBe(true);
});

// value

test("value basic", () => {
  expect(Option.value<number>(1, 2)).toBe(1);
});

test("value fallback", () => {
  expect(Option.value(undefined, 2)).toBe(2);
});

test("value falsy", () => {
  expect(Option.value<number>(0, 1)).toBe(0);
});

test("value reference", () => {
  const a = {};
  const b = {};
  expect(Option.value(a, b) === a).toBeTruthy();
});

test("value reference 2", () => {
  const a = {};
  const b = {};
  expect(Option.value(a, b) === b).toBeFalsy();
});

test("value side effect 1", () => {
  const a: any = {};
  const b: any = Option.value(a, {});
  a.c = 1;
  expect(b.c).toBe(1);
});

test("value side effect 2", () => {
  const a: any = {};
  const b: any = Option.value(undefined, a);
  a.c = 1;
  expect(b.c).toBe(1);
});

test("value semantic", () => {
  expect(Option.value(Option.some(null), "")).toBe(null);
});

test("value semantic none", () => {
  expect(Option.value(Option.none(), "")).toBe("");
});

// valOf

test("valOf 1", () => {
  expect(Option.valOf(1)).toBe(1);
});

test("valOf none", () => {
  expect(() => Option.valOf(undefined)).toThrow();
});

test("valOf falsy", () => {
  expect(Option.valOf(null)).toBe(null);
});

test("valOf reference", () => {
  const a = {b: 1};
  Option.valOf(a).b += 1;
  expect(a.b).toBe(2);
});

// map

test("map simple", () => {
  expect(Option.map<number, number>(1, (a: number) => a + 1)).toBe(2);
});

test("map type", () => {
  expect(Option.map(1, (_) => "hello")).toBe("hello");
});

test("map reference", () => {
  const a = {b: 0};
  expect(Option.map(a, (b) => {
    const c = b.b;
    b.b += 1;
    return c;
  })).toBe(0);
  expect(a.b).toBe(1);
});

test("map none", () => {
  expect(Option.map(undefined, (_) => "hello")).toBeUndefined();
});

test("map to none", () => {
  expect(Option.map(1, (_) => undefined)).toBeUndefined();
});

// truthy

test("truthy truth", () => {
  expect(Option.isSome(Option.truthy(1))).toBe(true);
});

test("truthy false", () => {
  expect(Option.isSome(Option.truthy(false))).toBe(false);
});

test("truthy 0", () => {
  expect(Option.isSome(Option.truthy(0))).toBe(false);
});

test("truthy null", () => {
  expect(Option.isSome(Option.truthy(null))).toBe(false);
});

test("truthy undefined", () => {
  expect(Option.isSome(Option.truthy(undefined))).toBe(false);
});

test("truthy nan", () => {
  expect(Option.isSome(Option.truthy(NaN))).toBe(false);
});

test("truthy empty string", () => {
  expect(Option.isSome(Option.truthy(""))).toBe(false);
});

test("truthy empty object", () => {
  expect(Option.isSome(Option.truthy({}))).toBe(true);
});

test("truthy empty array", () => {
  expect(Option.isSome(Option.truthy([]))).toBe(true);
});

test("truthy -0", () => {
  expect(Option.isSome(Option.truthy(-0))).toBe(false);
});

// wrapNotNaN

test("wrapNotNaN number", () => {
  expect(Option.wrapNotNaN(1)).toBe(1);
});

test("wrapNotNaN 0", () => {
  expect(Option.wrapNotNaN(0)).toBe(0);
});

test("wrapNotNaN -0", () => {
  expect(Option.isSome(Option.wrapNotNaN(-0))).toBe(true);
});

test("wrapNotNaN NaN", () => {
  expect(Option.wrapNotNaN(NaN)).toBeUndefined();
});

test("wrapFinite valid", () => {
  expect(Option.wrapFinite(0)).toBe(0);
  expect(Option.wrapFinite(1)).toBe(1);
  expect(Option.wrapFinite(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
  expect(Option.wrapFinite(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
  expect(Option.wrapFinite(-Number.MAX_VALUE)).toBe(-Number.MAX_VALUE);
  expect(Option.wrapFinite(-Number.MIN_VALUE)).toBe(-Number.MIN_VALUE);
  expect(Option.wrapFinite(Number.MAX_SAFE_INTEGER))
    .toBe(Number.MAX_SAFE_INTEGER);
  expect(Option.wrapFinite(Number.MIN_SAFE_INTEGER))
    .toBe(Number.MIN_SAFE_INTEGER);
  expect(Option.wrapFinite(-0)).toBe(-0);
});

test("wrapFinite invalid", () => {
  expect(Option.wrapFinite(NaN)).toBe(undefined);
  expect(Option.wrapFinite(Number.POSITIVE_INFINITY)).toBe(undefined);
  expect(Option.wrapFinite(Number.NEGATIVE_INFINITY)).toBe(undefined);
});

test("mapNotNaN", () => {
  const numbers = [
    undefined,
    0,
    1,
    -0,
    -1,
    NaN,
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    Number.MIN_VALUE,
    Number.MAX_VALUE,
    -Number.MIN_VALUE,
    -Number.MAX_VALUE,
    Number.EPSILON,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    42,
  ];

  for (const num of numbers) {
    expect(Option.mapNotNaN(num)).toBe(Option.map(num, Option.wrapNotNaN));
  }
});

test("mapFinite", () => {
  const numbers = [
    undefined,
    0,
    1,
    -0,
    -1,
    NaN,
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    Number.MIN_VALUE,
    Number.MAX_VALUE,
    -Number.MIN_VALUE,
    -Number.MAX_VALUE,
    Number.EPSILON,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    42,
  ];

  for (const num of numbers) {
    expect(Option.mapFinite(num)).toBe(Option.map(num, Option.wrapFinite));
  }
});

test("value_ positive", () => {
  const shouldNotCall = jest.fn();
  expect(Option.value_(1, shouldNotCall)).toBe(1);
  expect(shouldNotCall).not.toBeCalled();
});

test("value_ defaultValue", () => {
  const shouldCall = jest.fn().mockReturnValue(1);
  expect(Option.value_(undefined, shouldCall)).toBe(1);
  expect(shouldCall).toBeCalled();
});

// both

test("both none none", () => {
  expect(Option.both(undefined, undefined)).toBeUndefined();
});

test("both some none", () => {
  expect(Option.both(null, undefined)).toBeUndefined();
});

test("both none some", () => {
  expect(Option.both(undefined, null)).toBeUndefined();
});

test("both some some", () => {
  const a = Option.both<null, number>(null, 0);
  if (Option.isSome(a)) {
    expect(a[0]).toBeNull();
    expect(a[1]).toBe(0);
  } else {
    expect(false).toBe(true);
  }
});

test("both references", () => {
  const a = {b: 0};

  const b = Option.both(a, null);

  if (Option.isSome(b)) {
    b[0].b += 1;
    expect(a.b).toBe(1);
  } else {
    expect(false).toBe(true);
  }
});

// some

test("some undefined", () => {
  expect(() => Option.some(undefined)).toThrow();
});

test("some falsy", () => {
  expect(Option.isSome(Option.some(false))).toBe(true);
});

test("some value", () => {
  expect(Option.some(1)).toBe(1);
});

test("some reference", () => {
  const a = {b: 0};
  (Option.some(a) as any).b += 1;
  expect(a.b).toBe(1);
});

test("some semantics", () => {
  const a = {};
  expect(Option.some(a)).toBe(Option.some(a));
});

// none

test("none value", () => {
  expect(Option.none()).toBeUndefined();
});

test("none semantics", () => {
  expect(Option.none()).toBe(Option.none());
});

// choice

test("choice some", () => {
  const a = {};
  const b = {};
  expect(Option.choice(null, a, b)).toBe(a);
  expect(Option.choice(null, a, b)).not.toBe(b);
});

test("choice none", () => {
  const a = {};
  const b = {};
  expect(Option.choice(undefined, a, b)).not.toBe(a);
  expect(Option.choice(undefined, a, b)).toBe(b);
});

describe("assertSome", () => {
  // tslint:disable:no-console

  const memoizedConsoleWarn = console.warn;

  beforeEach(() => {
    console.warn = jest.fn();
  });

  afterEach(() => {
    console.warn = memoizedConsoleWarn;
  });

  test("output", () => {
    expect(Option.assertSome(1)).toBe(1);
    expect(Option.assertSome(undefined)).toBeUndefined();
  });

  test("warning", () => {
    expect(Option.assertSome(undefined)).toBeUndefined();
    expect(console.warn).toBeCalled();
  });
  // tslint:enable:no-console
});

describe("wrapNotNull", () => {
  test("truthy", () => {
    expect(Option.wrapNotNull(1)).toBe(1);
    expect(Option.wrapNotNull(true)).toBe(true);
  });

  test("falsy", () => {
    expect(Option.wrapNotNull(false)).toBe(false);
    expect(Option.wrapNotNull(0)).toBe(0);
    expect(Option.wrapNotNull(NaN)).toBe(NaN);
    expect(Option.wrapNotNull("")).toBe("");
  });

  test("null", () => {
    expect(Option.wrapNotNull(null)).toBeUndefined();
  });
});

describe("value_ call with stuffs", () => {
  test("default value not executed", () => {
    const defaultFunction = jest.fn((a, b) => a + b);
    const result = Option.value_(1, defaultFunction, 1, 2);
    expect(result).toBe(1);
    expect(defaultFunction).not.toBeCalled();
  });

  test("default value executed, single param", () => {
    const defaultFunction = jest.fn(({ a }) => a);
    const param = { a: 1 };
    const result = Option.value_(undefined, defaultFunction, param);
    expect(result).toBe(1);
    expect(defaultFunction).toBeCalledWith(param);
  });

  test("default value executed, multiple params", () => {
    const defaultFunction = jest.fn(({ a }, { b }) => a + b);
    const param1 = { a: 1 };
    const param2 = { b: 2 };
    const result = Option.value_(undefined, defaultFunction, param1, param2);
    expect(result).toBe(3);
    expect(defaultFunction).toBeCalledWith(param1, param2);
  });
});

describe("option execute", () => {

  test("execute none", () => {
    const exec = jest.fn();
    expect(Option.execute(undefined, 1, 2)).toBeUndefined();
    expect(exec).not.toBeCalled();
  });

  test("execute some", () => {
    const exec = jest.fn();
    Option.execute(exec, 1, 2);
    expect(exec).toBeCalledWith(1, 2);
  });

  test("execute return none", () => {
    const exec = jest.fn((..._) => undefined);
    expect(Option.execute(exec, 1, 2)).toBeUndefined();
    expect(exec).toBeCalledWith(1, 2);
  });

  test("execute some", () => {
    const exec = jest.fn((..._) => 3);
    expect(Option.execute(exec, 1, 2)).toBe(3);
    expect(exec).toBeCalledWith(1, 2);
  });

});

describe("mapChoice", () => {
  test("if value is some, the result is returned", () => {
    const opt = { b: 2 };
    const truth = { a: 0 };
    const lie = { a: 2 };
    const mapper = jest.fn(() => truth);
    const result = Option.mapChoice(opt, mapper, lie);
    expect(result).toBe(truth);
    expect(result).not.toBe(lie);
  });

  test("if value is some, the executor is called", () => {
    const opt = { b: 2 };
    const truth = { a: 0 };
    const lie = { a: 2 };
    const mapper = jest.fn(() => truth);
    const result = Option.mapChoice(opt, mapper, lie);
    expect(result).toBe(truth);
    expect(mapper).toBeCalled();
    expect(mapper).toBeCalledWith(opt);
  });

  test("if value is none, the fallback is returned", () => {
    const opt = undefined;
    const truth = { a: 0 };
    const lie = { a: 2 };
    const mapper = jest.fn(() => truth);
    const result = Option.mapChoice(opt, mapper, lie);
    expect(result).not.toBe(truth);
    expect(result).toBe(lie);
  });

  test("if value is some, the executor is not called", () => {
    const opt = undefined;
    const truth = { a: 0 };
    const lie = { a: 2 };
    const mapper = jest.fn(() => truth);
    const result = Option.mapChoice(opt, mapper, lie);
    expect(result).toBe(lie);
    expect(mapper).not.toBeCalled();
  });
});

describe("mapChoice_", () => {
  test("if value is some, the result is returned", () => {
    const opt = { b: 2 };
    const truth = { a: 0 };
    const lie = { a: 2 };
    const mapper = jest.fn(() => truth);
    const liar = jest.fn(() => lie);
    const result = Option.mapChoice_(opt, mapper, liar);
    expect(result).toBe(truth);
    expect(result).not.toBe(lie);
  });

  test("if value is some, the executor is called", () => {
    const opt = { b: 2 };
    const truth = { a: 0 };
    const lie = { a: 2 };
    const mapper = jest.fn(() => truth);
    const liar = jest.fn(() => lie);
    const result = Option.mapChoice_(opt, mapper, liar);
    expect(result).toBe(truth);
    expect(mapper).toBeCalled();
    expect(mapper).toBeCalledWith(opt);
    expect(liar).not.toBeCalled();
  });

  test("if value is none, the fallback is returned", () => {
    const opt = undefined;
    const truth = { a: 0 };
    const lie = { a: 2 };
    const mapper = jest.fn(() => truth);
    const liar = jest.fn(() => lie);
    const result = Option.mapChoice_(opt, mapper, liar);
    expect(result).not.toBe(truth);
    expect(result).toBe(lie);
  });

  test("if value is some, the executor is not called", () => {
    const opt = undefined;
    const truth = { a: 0 };
    const lie = { a: 2 };
    const mapper = jest.fn(() => truth);
    const liar = jest.fn(() => lie);
    const result = Option.mapChoice_(opt, mapper, liar);
    expect(result).toBe(lie);
    expect(mapper).not.toBeCalled();
    expect(liar).toBeCalled();
  });
});

describe("compareSome", () => {
  test("both undefined, comparison function not called", () => {
    const comparison = jest.fn(() => true);
    expect(Option.compareSome(undefined, undefined, comparison)).toBe(false);
    expect(comparison).not.toBeCalled();
  });

  test("left undefined, comparison function not called", () => {
    const comparison = jest.fn(() => true);
    expect(Option.compareSome(undefined, 1, comparison)).toBe(false);
    expect(comparison).not.toBeCalled();
  });

  test("right undefined, comparison function not called", () => {
    const comparison = jest.fn(() => true);
    expect(Option.compareSome(2, undefined, comparison)).toBe(false);
    expect(comparison).not.toBeCalled();
  });

  test("both defined, comparison called", () => {
    const left = 3;
    const right = 5;
    const comparison = jest.fn(() => true);
    expect(Option.compareSome(left, right, comparison)).toBe(true);
    expect(comparison).toBeCalled();
    expect(comparison).toBeCalledWith(left, right);
  });
});

describe("callIf", () => {
  test("defined", () => {
    const mapper = jest.fn((n) => n + 1);
    expect(Option.callIf(mapper, 1)).toBe(2);
    expect(mapper).toBeCalled();
  });

  test("undefined", () => {
    expect(Option.callIf(undefined, 1)).toBe(1);
  });
});
