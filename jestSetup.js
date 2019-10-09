/**
 * jestSetup.js
 * @author Diao Zheng
 * @file Jest setup script for @m1/base
 */

const Hashing = require("./dist/Hashing");

Hashing.setContext({
  a: 943452021,
  array: 1060073,
  b: 236526900,
  bigint: 289466511,
  boolean: 860809676,
  float: 279152083,
  int: 746355177,
  nan: 596714414,
  null: 68627158,
  object: 872328592,
  p: 1073738801,
  string: 153996556,
  symbol: 569108737,
  undefined: 783907053,
});
