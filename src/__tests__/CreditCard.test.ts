/**
 * CreditCard.test.ts
 * @author Diao Zheng
 * @file Testing the formatting of credit-card numbers
 */

import { chunkCreditCardNumber } from "../CreditCard";

test("visa 16", () => {
  expect(chunkCreditCardNumber("1234567890abcdef"))
    .toStrictEqual(["1234", "5678", "90ab", "cdef"]);

  expect(chunkCreditCardNumber("1234567890abcdef", "VISA"))
    .toStrictEqual(["1234", "5678", "90ab", "cdef"]);
});

test("visa 13", () => {
  expect(chunkCreditCardNumber("1234567890abc"))
    .toStrictEqual(["1234", "5678", "90abc"]);

  expect(chunkCreditCardNumber("1234567890abc", "VISA"))
    .toStrictEqual(["1234", "5678", "90abc"]);
});

test("visa 19 (defaulting to unionpay style)", () => {
  expect(chunkCreditCardNumber("1234567890abcdefghi"))
    .toStrictEqual(["123456", "7890abcdefghi"]);

  expect(chunkCreditCardNumber("1234567890abcdefghi", "VISA"))
    .toStrictEqual(["123456", "7890abcdefghi"]);
});

test("amex", () => {
  expect(chunkCreditCardNumber("1234567890abcde"))
    .toStrictEqual(["1234", "567890", "abcde"]);

  expect(chunkCreditCardNumber("1234567890abcde", "AMEX"))
    .toStrictEqual(["1234", "567890", "abcde"]);
});

test("unionpay 16", () => {
  expect(chunkCreditCardNumber("1234567890abcdef"))
    .toStrictEqual(["1234", "5678", "90ab", "cdef"]);

  expect(chunkCreditCardNumber("1234567890abcdef", "CUP"))
    .toStrictEqual(["1234", "5678", "90ab", "cdef"]);
});

test("unionpay 17", () => {
  expect(chunkCreditCardNumber("1234567890abcdefg"))
    .toStrictEqual(["1234567890abcdefg"]);

  expect(chunkCreditCardNumber("1234567890abcdefg", "CUP"))
    .toStrictEqual(["1234567890abcdefg"]);
});

test("unionpay 18 (defaulting to maestro style)", () => {
  expect(chunkCreditCardNumber("1234567890abcdefgh"))
    .toStrictEqual(["12345678", "90abcdefgh"]);

  expect(chunkCreditCardNumber("1234567890abcdefgh", "CUP"))
    .toStrictEqual(["12345678", "90abcdefgh"]);
});

test("unionpay 19", () => {
  expect(chunkCreditCardNumber("1234567890abcdefghi"))
    .toStrictEqual(["123456", "7890abcdefghi"]);

  expect(chunkCreditCardNumber("1234567890abcdefghi", "CUP"))
    .toStrictEqual(["123456", "7890abcdefghi"]);
});

test("mastercard", () => {
  expect(chunkCreditCardNumber("1234567890abcdef"))
    .toStrictEqual(["1234", "5678", "90ab", "cdef"]);

  expect(chunkCreditCardNumber("1234567890abcdef", "MASTERCARD"))
    .toStrictEqual(["1234", "5678", "90ab", "cdef"]);
});

test("maestro 12", () => {
  expect(chunkCreditCardNumber("1234567890ab"))
    .toStrictEqual(["1234567890ab"]);

  expect(chunkCreditCardNumber("1234567890ab", "MAESTRO"))
    .toStrictEqual(["1234567890ab"]);
});

test("maestro 13", () => {
  expect(chunkCreditCardNumber("1234567890abc"))
    .toStrictEqual(["1234", "5678", "90abc"]);

  expect(chunkCreditCardNumber("1234567890abc", "MAESTRO"))
    .toStrictEqual(["1234", "5678", "90abc"]);
});

test("maestro 14 (defaulting to Diner's style)", () => {
  expect(chunkCreditCardNumber("1234567890abcd"))
    .toStrictEqual(["1234", "567890", "abcd"]);

  expect(chunkCreditCardNumber("1234567890abcd", "MAESTRO"))
    .toStrictEqual(["1234", "567890", "abcd"]);
});

test("maestro 15", () => {
  expect(chunkCreditCardNumber("1234567890abcde"))
    .toStrictEqual(["1234", "567890", "abcde"]);

  expect(chunkCreditCardNumber("1234567890abcde", "MAESTRO"))
    .toStrictEqual(["1234", "567890", "abcde"]);
});

test("maestro 16", () => {
  expect(chunkCreditCardNumber("1234567890abcdef"))
    .toStrictEqual(["1234", "5678", "90ab", "cdef"]);

  expect(chunkCreditCardNumber("1234567890abcdef", "MAESTRO"))
    .toStrictEqual(["1234", "5678", "90ab", "cdef"]);
});

test("maestro 17", () => {
  expect(chunkCreditCardNumber("1234567890abcdefg"))
    .toStrictEqual(["1234567890abcdefg"]);

  expect(chunkCreditCardNumber("1234567890abcdefg", "MAESTRO"))
    .toStrictEqual(["1234567890abcdefg"]);
});

test("maestro 18", () => {
  expect(chunkCreditCardNumber("1234567890abcdefgh"))
    .toStrictEqual(["12345678", "90abcdefgh"]);

  expect(chunkCreditCardNumber("1234567890abcdefgh", "MAESTRO"))
    .toStrictEqual(["12345678", "90abcdefgh"]);
});

test("maestro 19", () => {
  expect(chunkCreditCardNumber("1234567890abcdefghi"))
    .toStrictEqual(["123456", "7890abcdefghi"]);

  expect(chunkCreditCardNumber("1234567890abcdefghi", "MAESTRO"))
    .toStrictEqual(["1234", "5678", "90ab", "cdef", "ghi"]);
});

test("uatp", () => {
  expect(chunkCreditCardNumber("1234567890abcde"))
    .toStrictEqual(["1234", "567890", "abcde"]);

  expect(chunkCreditCardNumber("1234567890abcde", "UATP"))
    .toStrictEqual(["1234", "56789", "0abcde"]);
});
