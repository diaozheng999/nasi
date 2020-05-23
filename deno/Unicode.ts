/**
 * Unicode.ts
 * @author Diao Zheng
 * @file Constants for Unicode symbols and get unicode by alphabet.
 * @barrel export all
 */

import { invariant } from "./Contract.ts";

export const EN_DASH = "\u2013";
export const EM_DASH = "\u2014";

const COUNTRY_FLAG_DISCRIMMINATOR = 0x1f185;

export function getUnicodeByAlphabet(char: string): string {
  invariant(
    () => /^[a-z]$/.test(char),
    "Should be ASCII small letter",
  );
  return String.fromCodePoint(
    (char.codePointAt(0) || 0) + COUNTRY_FLAG_DISCRIMMINATOR,
  );
}
