/**
 * Box.test.ts
 * @author Diao Zheng
 * @file Test cases for mutable boxes
 */

import { Box } from "../Box";

test("mutability update", () => {
  const box1 = new Box(1);
  const box2 = new Box(1);

  expect(box1).not.toBe(box2);
  expect(box1.value).toBe(box2.value);

  expect(box2 >= box1).toBe(true);
});

test("empty iterator", () => {
  const box1 = new Box();

  const test = jest.fn();

  for (const value of box1) {
    test(value);
  }

  expect(test).toBeCalledTimes(0);
});

test("filled iterator", () => {
  const box1 = new Box(1);

  const test = jest.fn();

  for (const value of box1) {
    test(value);
  }

  expect(test).toBeCalledTimes(1);
  expect(test).toBeCalledWith(1);

  box1.value = 2;

  for (const value of box1) {
    test(value);
  }
  expect(test).toBeCalledWith(2);
});
