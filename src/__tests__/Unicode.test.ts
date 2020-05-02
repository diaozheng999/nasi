/**
 * Unicode.test.ts
 * @author Flash
 * @file test files for Unicode
 */
import * as Contract from "../Contract";
import * as Unicode from "../Unicode";

beforeEach(() => {
  Contract.dismissContractMessages(/Should be ASCII small letter/);
});

afterEach(() => {
  Contract.restoreContractMessages();
});

test("getUnicodeByAlphabet from a", () => {
  expect(Unicode.getUnicodeByAlphabet("a")).toBe("🇦");
});

test("getUnicodeByAlphabet from 1", () => {
  expect(() => Unicode.getUnicodeByAlphabet("1")).toThrow();
});

test("getUnicodeByAlphabet from empty string", () => {
  expect(() => Unicode.getUnicodeByAlphabet("")).toThrow();
});

test("getUnicodeByAlphabet from symbol !", () => {
  expect(() => Unicode.getUnicodeByAlphabet("!")).toThrow();
});

test("getUnicodeByAlphabet from A", () => {
  expect(() => Unicode.getUnicodeByAlphabet("A")).toThrow();
});

test("getUnicodeByAlphabet from Z", () => {
  expect(() => Unicode.getUnicodeByAlphabet("Z")).toThrow();
});

test("getUnicodeByAlphabet from `", () => {
  expect(() => Unicode.getUnicodeByAlphabet("`")).toThrow();
});

test("getUnicodeByAlphabet from {", () => {
  expect(() => Unicode.getUnicodeByAlphabet("{")).toThrow();
});

test("getUnicodeByAlphabet from о", () => {
  // This is Unicode Cyrillic letter o
  expect(() => Unicode.getUnicodeByAlphabet("о")).toThrow();
});
