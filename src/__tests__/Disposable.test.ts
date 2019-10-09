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
