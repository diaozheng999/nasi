/**
 * Unique.test.ts
 * @author Diao Zheng
 * @file Unique key generation testing
 */

import { Unique } from "../Unique";

test("inequality", () => {
  const unique = new Unique();
  for (let i = 0; i < 1000; ++i) {
    expect(unique.number).not.toBe(unique.number);
    expect(unique.string).not.toBe(unique.string);
    expect(unique.opaque).not.toBe(unique.opaque);
    expect(typeof unique.opaque).toBe("string");
  }
});

test("inequality 2", () => {
  const unique = new Unique();
  const unique2 = new Unique("Unique2");
  for (let i = 0; i < 1000; ++i) {
    expect(unique.number).not.toBe(unique2.number);
    expect(unique.string).not.toBe(unique2.string);
    expect(unique.opaque).not.toBe(unique2.opaque);
    expect(typeof unique2.opaque).toBe("string");
  }

  expect(unique2.toString().startsWith("Unique2")).toBe(true);
  expect(unique.toString().startsWith("Unique_Identifier")).toBe(true);
});
