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
