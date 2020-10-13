/**
 * Dev.ts
 * @author Diao Zheng
 * @file External development flags
 * @barrel export all
 */
import { AnyArray, Unconstrained } from "./Types.ts";
let inDevMode = false;
export function setDevMode(mode: boolean) {
  inDevMode = mode;
}
export function devOnly<TArgs extends AnyArray>(
  thunk: (...args: TArgs) => void,
  ...args: TArgs
) {
  if (inDevMode) {
    thunk(...args);
  }
}
export function select<TArgs extends AnyArray, TReturn>(
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
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
if ((global as Unconstrained).__DEV__ !== undefined) {
  // in React Native, we use React's defined __DEV__ value
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  setDevMode((global as Unconstrained).__DEV__);
} else if (process.env.NODE_ENV) {
  // in NodeJS, we use Node's environment variable
  setDevMode(!/^prod.*$/i.exec(process.env.NODE_ENV));
}
