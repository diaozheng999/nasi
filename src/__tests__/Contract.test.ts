/**
 * Contract.test.ts
 * @author Diao Zheng
 * @file test cases for dev contracts
 */

import * as Contract from "../Contract";

/* eslint-disable no-console */

const memoisedConsoleWarn = console.warn;
const memoisedConsoleError = console.error;

beforeEach(() => {
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.warn = memoisedConsoleWarn;
  console.error = memoisedConsoleError;
});

test("invariant pass", () => {
  const inv = jest.fn(() => true);
  Contract.invariant(inv);
  expect(inv).toBeCalled();
});

test("invariant fail error", () => {
  const inv = jest.fn(() => false);
  expect(() => Contract.invariant(inv)).toThrowError();
  expect(inv).toBeCalled();
  expect(console.warn).not.toBeCalled();
  expect(console.error).toBeCalled();
});

test("invariant fail warn", () => {
  const inv = jest.fn(() => false);
  expect(() => Contract.invariant(inv, undefined, false)).not.toThrowError();
  expect(inv).toBeCalled();
  expect(console.warn).toBeCalled();
  expect(console.error).not.toBeCalled();
});

test("invariant custom message", () => {
  const inv = jest.fn(() => false);
  Contract.invariant(inv, "hallo", false);
  expect(console.warn).toBeCalledWith("hallo");
});

describe("assertNever", () => {
  // tslint:disable:no-console

  const memoizedConsoleWarn = console.warn;

  beforeEach(() => {
    console.warn = jest.fn();
  });

  afterEach(() => {
    console.warn = memoizedConsoleWarn;
  });

  /**
   * We are expecting to test for invalid input, e.g. if in default case in
   * switch statements.
   */
  test("input and output", () => {
    const someMockFn = jest.fn();

    expect(() => {
      /** Using `as never` so as to run the test */
      Contract.assertNever("some non-never input here" as never);
      someMockFn();
    }).toThrowError(Error);
    expect(console.warn).toBeCalled();
    expect(someMockFn).not.toHaveBeenCalled();
  });
  // tslint:enable:no-console
});

class TestClass {
  public static requirePass = jest.fn(() => true);
  public static requireFail = jest.fn(() => false);
  public static ensurePass = jest.fn((_: number) => true);
  public static ensureFail = jest.fn((_: number) => false);
  public static fn = jest.fn();
  @Contract.requires(TestClass.requirePass)
  @Contract.ensures(TestClass.ensurePass)
  public static testStaticPass() {
    TestClass.fn();
    return 1;
  }

  @Contract.requires(TestClass.requireFail)
  public static testStaticRequireFail() {
    TestClass.fn();
    return 2;
  }

  @Contract.ensures(TestClass.ensureFail)
  public static testStaticEnsureFail() {
    TestClass.fn();
    return 3;
  }
  @Contract.requires(TestClass.requirePass)
  @Contract.ensures(TestClass.ensurePass)
  public testInstancePass() {
    TestClass.fn();
    return 4;
  }

  @Contract.requires(TestClass.requireFail)
  public testInstanceRequireFail() {
    TestClass.fn();
    return 5;
  }

  @Contract.ensures(TestClass.ensureFail)
  public testInstanceEnsureFail() {
    TestClass.fn();
    return 6;
  }
}

describe("Contract decorators", () => {
  beforeEach(() => {
    TestClass.requireFail.mockClear();
    TestClass.requirePass.mockClear();
    TestClass.ensureFail.mockClear();
    TestClass.ensurePass.mockClear();
    TestClass.fn.mockClear();
  });

  test("static pass", () => {
    TestClass.testStaticPass();
    expect(TestClass.requirePass).toBeCalled();
    expect(TestClass.ensurePass).toBeCalledWith(1);
    expect(TestClass.fn).toBeCalled();
  });

  test("static require fail", () => {
    expect(() => TestClass.testStaticRequireFail()).toThrowError();
    expect(TestClass.requireFail).toBeCalled();
    expect(TestClass.fn).not.toBeCalled();
  });

  test("static ensure fail", () => {
    expect(() => TestClass.testStaticEnsureFail()).toThrowError();
    expect(TestClass.ensureFail).toBeCalledWith(3);
    expect(TestClass.fn).toBeCalled();
  });

  test("instance pass", () => {
    const instance = new TestClass();
    instance.testInstancePass();
    expect(TestClass.requirePass).toBeCalled();
    expect(TestClass.ensurePass).toBeCalledWith(4);
    expect(TestClass.fn).toBeCalled();
  });

  test("instance require fail", () => {
    const instance = new TestClass();
    expect(() => instance.testInstanceRequireFail()).toThrowError();
    expect(TestClass.requireFail).toBeCalled();
    expect(TestClass.fn).not.toBeCalled();
  });

  test("instance ensure fail", () => {
    const instance = new TestClass();
    expect(() => instance.testInstanceEnsureFail()).toThrowError();
    expect(TestClass.ensureFail).toBeCalledWith(6);
    expect(TestClass.fn).toBeCalled();
  });
});
