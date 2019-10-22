/**
 * F.test.ts
 * @author Diao Zheng
 * @file test cases for F
 */

import * as F from "../F";

test("chain", () => {
  const f1 = jest.fn((a) => a + 1);
  const f2 = jest.fn((a) => a * 2);
  const composed = F.compose(f2, f1);
  const composed2 = F.compose(f1, composed);

  const piped = F.pipe(f1, f2);
  const piped2 = F.pipe(piped, f1);

  expect(composed2(5)).toBe(13);
  expect(piped2(5)).toBe(13);
});

describe("memo", () => {
  test("memo0", () => {
    const actual = jest.fn(() => 5);
    const memoised = F.memoise(actual);
    expect(memoised()).toBe(5);
    expect(memoised()).toBe(5);
    expect(actual).toBeCalledTimes(1);
  });

  test("memo1", () => {
    const actual = jest.fn((a) => a + 1);
    const memoised = F.memoise(actual);
    expect(memoised(1)).toBe(2);
    expect(memoised(2)).toBe(3);
    expect(memoised(1)).toBe(2);
    expect(memoised(2)).toBe(3);
    expect(actual).toBeCalledTimes(2);
  });

  test("memo chain", () => {

    const actual = jest.fn((a) => a + 1);
    const memoised = F.memoise(actual);
    expect(memoised(1)).toBe(2);
    expect(memoised(2)).toBe(3);

    const memo2 = F.memoise(memoised);

    expect(memo2(1)).toBe(2);
    expect(memo2(2)).toBe(3);
    expect(actual).toBeCalledTimes(2);
  });
});
