import { terser } from "rollup-plugin-terser";

module.exports = {
  input: "dist/esm/index.js",
  plugins: [terser()],
  external: [
    "lodash/clamp",
    "lodash/has",
    "lodash/isNumber",
    "lodash/isString",
    "lodash/isBoolean",
    "lodash/isArrayLike",
    "lodash/uniq",
    "lru-cache",
    "splaytree",
    "tslib",
  ],
  output: {
    file: "dist/cjs/index.js",
    format: "cjs",
  },
};
