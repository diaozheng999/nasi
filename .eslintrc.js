module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.lint.json"],
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
  ],
  ignorePatterns: ["deno/", "dist/"],
  rules: {
    "no-console": "error",
    "no-magic-numbers": ["error", { ignore: [0, 1, -1, 2, 0.5, -2, -0.5] }],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": ["error"],
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "typeParameter",
        filter: "^[A-Z]$",
        format: ["PascalCase"],
      },
      {
        selector: "typeParameter",
        filter: {
          regex: "^.{2,}$",
          match: true,
        },
        format: ["PascalCase"],
        prefix: ["T"],
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
      },
      {
        selector: "function",
        format: ["PascalCase", "camelCase"],
        trailingUnderscore: "allow",
      },
      {
        selector: "function",
        filter: "^(UNSAFE_|INTERNAL_|DEPRECATED_)",
        prefix: ["UNSAFE_", "INTERNAL_", "DEPRECATED_"],
        format: ["camelCase"],
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "method",
        filter: "^UNSAFE_",
        prefix: ["UNSAFE_"],
        format: ["camelCase"],
      },
      {
        selector: "property",
        modifiers: ["readonly"],
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
    ],
    "jest/no-commented-out-tests": "error",
    "jest/no-disabled-tests": "error",

    // FIXME: temporarily disable some strict rules
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
  },
  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx"],
      rules: {
        "no-magic-numbers": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off"
      },
    },
  ],
};
