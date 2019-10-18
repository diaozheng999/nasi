/**
 * Disposable.test.ts
 * @author Diao Zheng
 * @file test functions for disposable objects
 */

import { Disposable } from "../Disposable";

test("single dispose", () => {
  const fn = jest.fn();
  const disposable = new Disposable(fn);
  expect(disposable.isDisposed).toBe(false);
  disposable.dispose();
  expect(fn).toBeCalled();
  expect(disposable.isDisposed).toBe(true);
});

test("guard against multiple disposes", () => {
  // tslint:disable:no-console
  const memoizedConsoleWarn = console.warn;
  console.warn = jest.fn();
  const fn = jest.fn();
  const disposable = new Disposable(fn);
  disposable.dispose();
  disposable.dispose();
  expect(console.warn).toBeCalledTimes(1);
  expect(fn).toBeCalledTimes(1);

  console.warn = memoizedConsoleWarn;
});

test("disposing a custom object", () => {
  const customDisposable = {
    [Disposable.IsDisposed]: false,
    [Disposable.Dispose]: jest.fn(),
  };

  Disposable.dispose(customDisposable);

  expect(customDisposable[Disposable.Dispose]).toBeCalledTimes(1);
});

test("disposing a custom object that's already disposed", () => {
  const memoizedConsoleWarn = console.warn;
  console.warn = jest.fn();

  const customDisposable = {
    [Disposable.IsDisposed]: true,
    [Disposable.Dispose]: jest.fn(),
  };

  Disposable.dispose(customDisposable);
  expect(console.warn).toBeCalledTimes(1);

  expect(customDisposable[Disposable.Dispose]).not.toBeCalled();

  console.warn = memoizedConsoleWarn;
});

test("disposing of a custom disposer", () => {
  const memoizedConsoleWarn = console.warn;
  console.warn = jest.fn();

  const disposeFunction = jest.fn();
  const customDisposable = {
    [Disposable.Instance]: new Disposable(disposeFunction),
  };

  Disposable.dispose(customDisposable);
  Disposable.dispose(customDisposable);

  expect(disposeFunction).toBeCalledTimes(1);

  console.warn = memoizedConsoleWarn;
});
