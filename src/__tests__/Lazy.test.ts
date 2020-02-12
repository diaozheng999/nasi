/**
 * Lazy.test.ts
 * @author Diao Zheng
 * @file Test cases for Lazy
 */

import { Lazy } from "../Lazy";

test("constructor is not called on start", () => {
  const constructor = jest.fn(() => 5);

  Lazy(constructor);

  expect(constructor).not.toBeCalled();
});

test("value is returned", () => {
  const constructor = jest.fn(() => 5);

  const lazy = Lazy(constructor);

  expect(lazy.value).toBe(5);
});

test("constructor is run when value gets returned", () => {
  const constructor = jest.fn(() => 5);

  const lazy = Lazy(constructor);

  expect(lazy.value).toBe(5);
  expect(constructor).toBeCalled();
});

test("constructor is run only once", () => {
  const constructor = jest.fn(() => 5);

  const lazy = Lazy(constructor);

  expect(lazy.value).toBe(5);
  expect(lazy.value).toBe(5);
  expect(constructor).toBeCalledTimes(1);
});

test("when value itself is a function", () => {

  const inner = jest.fn(() => 5);
  const constructor = jest.fn(() => inner);

  const lazy = Lazy(constructor);

  expect(lazy.value()).toBe(5);
  expect(lazy.value()).toBe(5);
  expect(constructor).toBeCalledTimes(1);
  expect(inner).toBeCalledTimes(2);
});

test("when value itself is falsy", () => {

  const constructor = jest.fn(() => null);

  const lazy = Lazy(constructor);

  expect(lazy.value).toBe(null);
  expect(lazy.value).toBe(null);
  expect(constructor).toBeCalledTimes(1);
});

test("when value itself is undefined", () => {

  const constructor = jest.fn(() => undefined);

  const lazy = Lazy(constructor);

  expect(lazy.value).toBeUndefined();
  expect(lazy.value).toBeUndefined();
  expect(constructor).toBeCalledTimes(1);
});
