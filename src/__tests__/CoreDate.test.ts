/**
 * CoreDate.test.ts
 * @author Kerk Chin Wee
 * @file test cases for CoreDate.ts
 */

import { wrapDate } from "../CoreDate";

describe("getDate", () => {

  test("undefined timestamp", () => {
    expect(wrapDate(undefined)).toBeUndefined();
  });

  test("null timestamp", () => {
    expect(wrapDate(null)).toBeUndefined();
  });

  test("invalid positive number timestamp (out of range)", () => {
    expect(wrapDate(8.64e15 + 1)).toBeUndefined();
  });

  test("invalid negative number timestamp (out of range)", () => {
    expect(wrapDate(-8.64e15 - 1)).toBeUndefined();
  });

  test("valid positive number timestamp", () => {
    // 1989-01-05T10:39:59.999Z
    const date = new Date("1989-01-05T10:39:59.999Z");
    expect(wrapDate(599999999999)).toStrictEqual(date);
  });

  test("valid negative number timestamp", () => {
    // 1950-12-27T13:20:00.001Z
    const date = new Date("1950-12-27T13:20:00.001Z");
    expect(wrapDate(-599999999999)).toStrictEqual(date);
  });

  test("0 timestamp", () => {
    // 1970-01-01T00:00:00.000Z
    const date = new Date(0);
    expect(wrapDate(0)).toStrictEqual(date);
  });

  test("-0 timestamp", () => {
    // 1970-01-01T00:00:00.000Z
    const date = new Date(0);
    expect(wrapDate(-0)).toStrictEqual(date);
  });

  test("+infinity timestamp", () => {
    expect(wrapDate(Number.POSITIVE_INFINITY)).toBeUndefined();
  });

  test("-infinity timestamp", () => {
    expect(wrapDate(Number.NEGATIVE_INFINITY)).toBeUndefined();
  });

  test("NAN timestamp", () => {
    expect(wrapDate(Number.NaN)).toBeUndefined();
  });

});
