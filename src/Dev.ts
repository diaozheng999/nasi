/**
 * Dev.ts
 * @author Diao Zheng
 * @file External development flags
 * @barrel export all
 */

declare var __DEV__: boolean;

let inDevMode = __DEV__ || false;

export function setDevMode(mode: boolean) {
  inDevMode = mode;
}

export function devOnly<TArgs extends any[]>(
  thunk: (...args: TArgs) => void,
  ...args: TArgs
) {
  if (inDevMode) {
    thunk(...args);
  }
}

export function select<TArgs extends any[], TReturn>(
  devMode: (...args: TArgs) => TReturn,
  prodMode: (...args: TArgs) => TReturn,
  ...args: TArgs
) {
  if (inDevMode) {
    return devMode(...args);
  }
  return prodMode(...args);
}

// set default dev modes
if ((global as any).__DEV__ !== undefined) {
  // in React Native, we use React's defined __DEV__ value
  setDevMode((global as any).__DEV__);
} else if (process.env.NODE_ENV) {
  // in NodeJS, we use Node's environment variable
  setDevMode(!process.env.NODE_ENV.match(/^prod.*$/i));
}
