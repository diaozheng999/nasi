/**
 * P.test.ts
 * @author Diao Zheng
 * @file Test cases for `P` (predicate functions)
 */

import * as P from "../P";
import { Unconstrained } from "../Types";

describe("and", () => {
  test("and never", () => {
    const pred = P.and(P.never);
    expect(pred(1)).toBe(false);
    expect(pred).toBe(P.never);
  });

  test("and always", () => {
    const pred = P.and(P.always);
    expect(pred(1)).toBe(true);
  });

  test("and empty", () => {
    const empty = P.and();
    expect(empty(1)).toBe(true);
  });

  test("normal and return false", () => {
    const pred1 = jest.fn(() => false);
    const pred2 = jest.fn(() => true);

    expect(P.and(pred1, pred2)(1)).toBe(false);
    expect(pred1).toBeCalled();
    expect(pred2).not.toBeCalled();
  });

  test("normal return all", () => {
    const pred1 = jest.fn(() => true);
    const pred2 = jest.fn(() => true);
    expect(P.and(pred1, pred2)(1)).toBe(true);
    expect(pred1).toBeCalled();
    expect(pred2).toBeCalled();
  });

  test("normal conjunction chain", () => {
    const pred1 = jest.fn(() => true);
    const pred2 = jest.fn(() => true);
    const pred3 = P.and(pred1, pred2);
    expect(P.and(pred1, pred3)(1)).toBe(true);
    expect(pred1).toBeCalledTimes(1);
    expect(pred2).toBeCalledTimes(1);
  });

  test("normal disjunction chain", () => {
    const pred1 = jest.fn(() => true);
    const pred2 = jest.fn(() => true);
    const pred3 = P.or(pred1, pred2);
    expect(P.and(pred1, pred3)(1)).toBe(true);
    expect(pred1).toBeCalledTimes(2);
    expect(pred2).not.toBeCalled();
  });

  test("not conjunction chain", () => {
    const pred1 = jest.fn((x) => x > 5);
    const pred2 = jest.fn(() => true);
    const pred3 = P.and(pred1, pred2);
    expect(P.and(pred1, pred3)(1)).toBe(false);
    expect(P.and(pred1, pred3)(10)).toBe(true);

    const negated = P.not(P.and(pred1, pred3));
    expect(negated(1)).toBe(true);
    expect(negated(10)).toBe(false);
  });
});

describe("or", () => {
  test("or never", () => {
    const pred = P.or(P.never);
    expect(pred(1)).toBe(false);
  });

  test("or always", () => {
    const pred = P.or(P.always);
    expect(pred(1)).toBe(true);
    expect(pred).toBe(P.always);
  });

  test("or empty", () => {
    const empty = P.or();
    expect(empty(1)).toBe(false);
  });

  test("normal and return false", () => {
    const pred1 = jest.fn(() => true);
    const pred2 = jest.fn(() => false);

    expect(P.or(pred1, pred2)(1)).toBe(true);
    expect(pred1).toBeCalled();
    expect(pred2).not.toBeCalled();
  });

  test("normal return all", () => {
    const pred1 = jest.fn(() => false);
    const pred2 = jest.fn(() => false);
    expect(P.or(pred1, pred2)(1)).toBe(false);
    expect(pred1).toBeCalled();
    expect(pred2).toBeCalled();
  });

  test("normal disjunction chain", () => {
    const pred1 = jest.fn(() => false);
    const pred2 = jest.fn(() => false);
    const pred3 = P.or(pred1, pred2);
    expect(P.or(pred1, pred3)(1)).toBe(false);
    expect(pred1).toBeCalledTimes(1);
    expect(pred2).toBeCalledTimes(1);
  });

  test("normal conjunction chain", () => {
    const pred1 = jest.fn(() => false);
    const pred2 = jest.fn(() => false);
    const pred3 = P.and(pred1, pred2);
    expect(P.or(pred1, pred3)(1)).toBe(false);
    expect(pred1).toBeCalledTimes(2);
    expect(pred2).not.toBeCalled();
  });

  test("not disjunction chain", () => {
    const pred1 = jest.fn((x) => x > 5);
    const pred2 = jest.fn(() => false);
    const pred3 = P.or(pred1, pred2);
    expect(P.or(pred1, pred3)(1)).toBe(false);
    expect(P.or(pred1, pred3)(10)).toBe(true);

    const negated = P.not(P.or(pred1, pred3));
    expect(negated(1)).toBe(true);
    expect(negated(10)).toBe(false);
  });
});

test("not simple", () => {
  const pred = jest.fn(() => true);
  expect(pred()).toBe(true);
  expect(P.not(pred)(1)).toBe(false);

  const pred2 = P.not(P.not(pred));

  expect(pred2).toBe(pred);
});

test("infer", () => {
  const predicate = jest.fn((a) => a > 5);
  const consequence = jest.fn((a) => a < 10);

  const inference = P.infer(predicate, consequence);

  expect(inference(0)).toBe(true);
  expect(inference(7)).toBe(true);
  expect(inference(12)).toBe(false);
});

test("branch", () => {
  const condition = jest.fn((a) => !(a % 2));
  const ifTrue = jest.fn((a) => a > 10);
  const ifFalse = jest.fn((a) => a < 10);

  const branched = P.branch(condition, ifTrue, ifFalse);

  expect(branched(12)).toBe(true);
  expect(branched(8)).toBe(false);
  expect(branched(7)).toBe(true);
  expect(branched(13)).toBe(false);
});

describe("basic tests", () => {
  test("is", () => {
    expect(P.is(5)(5)).toBe(true);
    expect(P.is(5)(7)).toBe(false);
    expect(P.is(0)(-0)).toBe(false);
    expect(P.is(P.never)(P.never)).toBe(true);
  });

  test("eq", () => {
    expect(P.eq(5)(5)).toBe(true);
    expect(P.eq(5)(7)).toBe(false);
    expect(P.eq(0)(-0)).toBe(true);
    expect(P.eq(P.never)(P.never)).toBe(true);
  });

  test("nan handling for is and eq", () => {
    expect(P.is(NaN)(NaN)).toBe(true);
    expect(P.eq(NaN)(NaN)).toBe(false);

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

    expect(P.is(floatView[0])(floatView[1])).toBe(true);
    expect(P.eq(floatView[0])(floatView[1])).toBe(false);
  });

  test("matches regex", () => {
    const regex = /^a/i;
    const pred = P.matches(regex);

    expect(pred("aa")).toBe(true);
    expect(pred("b")).toBe(false);
  });

  test("exists", () => {
    expect(P.exists<Unconstrained>("hello")({})).toBe(false);
    expect(P.exists("hello")({ hello: undefined })).toBe(false);
    expect(P.exists("hello")({ hello: null })).toBe(true);
    expect(P.exists("hello")({ hello: 1 })).toBe(true);
  });

  test("existsWith", () => {
    const pred = jest.fn((a) => a > 5);
    expect(P.existsWith<Unconstrained, Unconstrained>("hello", pred)({}))
      .toBe(false);
    expect(pred).not.toBeCalled();

    expect(
      P.existsWith<Unconstrained, Unconstrained>("hello", pred)({ hello: 0 }),
    ).toBe(false);
    expect(pred).toBeCalledTimes(1);

    expect(
      P.existsWith<Unconstrained, Unconstrained>("hello", pred)({ hello: 10 }),
    ).toBe(true);
    expect(pred).toBeCalledTimes(2);
  });
});

test("pred", () => {
  const predicate = jest.fn((a) => a > 5);
  const p = P.pred(predicate);

  expect(predicate).not.toBeCalled();

  expect(p(5)).toBe(false);
  expect(p(5)).toBe(false);
  expect(predicate).toBeCalledTimes(1);

  expect(p(10)).toBe(true);
  expect(p(10)).toBe(true);
  expect(predicate).toBeCalledTimes(2);
});
