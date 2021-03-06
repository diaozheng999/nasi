## 1.2.9
- Update `typescript` to `4.0.3`.
- Include experimental Deno rewrite in Otah
- Add `clone` function to `Box` to allow React/Redux state updates.
- Update `lodash` to `4.17.19`.

## 1.2.7
- Deno
- Unit
- Disposable rewrite

## 1.2.6
- Improve performance of `Semaphore`.
- Migrate from TSLint to ESLint.
- Update `typescript` to `3.8.3`.
- Update `tslib` to `1.11.1`.

## 1.2.5
- Add `ctor` to `F`.
- Add typed predicate as a conditon to `P.branch`.
- Fix bug with nested prototypes in `Disposable`.

## 1.2.4
- Add `update` in `Box`.

## 1.2.3
- Add `Lazy`.

## 1.2.2
- Add `callIf` in `Option`.

## 1.2.1
- Add Iterator support in `Box` for 0-1 iteration of optionals.

## 1.2.0

- Update dependency `typescript` to `3.7.2`, include support for TypeScript 3.7 features.
- Add type `Awaited` to retrieve the realised promise type.
- Remove `docs` from npm package
- Add `unwrapJson` to `UnitConversion`.
- Add string comparison.
- Add `Option.str` for template string mapping.
- Expose `LinkedList` internal functions.
- Fix bug related to `LinkedList`.

## 1.1.9

- `MemoryCache` uses `lru-cache` instead.

## 1.1.8

- Added `F` for function compositions and other pure function utilities
- Added `P` for predicate function logic

## 1.1.7

- `Option`: added type `NotNull` for value assertion.

## 1.1.6

- `Option`: added type `Some` for value assertion.

## 1.1.5

- Added `Box` for boxed mutable variables, similar to React refs.
- Added `LinkedList` as a doubly-linked list implementation.

## 1.1.4

- `Disposable`: Added custom disposables and ability for disposables to guard multiple invocations of custom disposables.

## 1.1.3

- Fixed a bug with `Option.property` returning `undefined` instead of default value.
- [Unstable] Added basic comparators.

## 1.1.2

- Moved dependency `rollup-plugin-terser` to devDependency.

## 1.1.1

- Added flexibility for `Dev` to include other forms of development variables, not only the React Native `__DEV__` variable.
- Added new functions in `Dev` module to execute code in dev-mode only.
- Removed `build_tools` from npm package.

## 1.1.0

- `Option`: added utility functions `mapChoice`, `mapChoice_` and `compareSome`.
- `Contract`: added functions `dismissContractMessages` and `restoreContractMessages` to allow disabling of specific error message printouts at test time.
- Improved support for development on Windows.
- Updated python scripts to work with Python 3.

## 1.0.0
Initial commit
