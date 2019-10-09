/**
 * Integer.test.ts
 * @author Diao Zheng
 * @file Tests for machine integers
 */

import { INT_MAX, INT_MIN, ofNumber } from "../Integer";

test("safe ofNumber nan", () => {
  expect(ofNumber(NaN)).toBeUndefined();
});

test("safe ofNumber out of range", () => {
  expect(ofNumber(INT_MAX + 1)).toBeUndefined();
  expect(ofNumber(INT_MIN - 1)).toBeUndefined();
});

test("safe ofNumber within range", () => {
  expect(ofNumber(INT_MAX)).toBe(INT_MAX);
  expect(ofNumber(INT_MIN)).toBe(INT_MIN);
  expect(ofNumber(0)).toBe(0);
  expect(ofNumber(1)).toBe(1);
  expect(ofNumber(-1)).toBe(-1);
});

test("safe ofNumber should only return the integral part", () => {
  expect(ofNumber(0.1)).toBe(0);
  expect(ofNumber(-0.1)).toBe(0);
  expect(ofNumber(1.1)).toBe(1);
  expect(ofNumber(1.9)).toBe(1);
  expect(ofNumber(-1.1)).toBe(-1);
  expect(ofNumber(-1.9)).toBe(-1);
});
