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

  expect(composed2(5)).toBe(13);
});
