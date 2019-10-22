
import { terser } from "rollup-plugin-terser";

module.exports = {
  input: "dist/esm/index.js",
  plugins: [
    terser(),
  ],
  external: [
    "lodash",
    "lru-cache",
    "splaytree",
    "tslib",
  ],
  output: {
    file: "dist/cjs/index.js",
    format: "cjs",
  },
};
