/**
 * Registry.test.ts
 * @author Diao Zheng
 * @file Test cases for Registry
 */

import { Registry } from "../Registry";

test("key registration", () => {
  const registry = new Registry<string, string>("DEFAULT");
  registry.addKey("hallo");
  const keys = Array.from(registry.keys());
  expect(keys).toContain("hallo");
  expect(keys).toContain("DEFAULT");
});
