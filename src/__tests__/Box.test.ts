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
