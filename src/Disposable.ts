/**
 * Disposable.ts
 * @author Diao Zheng
 * @file Represents an object that can be disposed once.
 */

import { invariant } from "./Contract";
import { devOnly } from "./Dev";
import { Unconstrained } from './Types';

const DISPOSE = Symbol.for("nasi/DISPOSE");
const IS_DISPOSED = Symbol.for("nasi/IS_DISPOSED");
const DISPOSABLE = Symbol.for("nasi/DISPOSABLE");

// @barrel export CustomDisposable

export interface CustomDisposable {
  [IS_DISPOSED]: boolean;
  [DISPOSE](): void;
}

interface InstanceDisposable {
  [DISPOSABLE]: Disposable;
}

export type DisposableType =
  | InstanceDisposable
  | CustomDisposable
  | Disposable
;

// @barrel export ICustomDisposable
// @barrel export IDisposable

/** @deprecated use `InstanceDisposable` instead */
export type IDisposable = InstanceDisposable;
/** @deprecated use `CustomDisposable` instead */
export type ICustomDisposable = CustomDisposable;

function isCustomDisposable(
  disposable: DisposableType,
): disposable is ICustomDisposable {

  const suspect: Unconstrained = disposable;

  return (
    typeof suspect[IS_DISPOSED] !== "undefined" &&
    typeof suspect[DISPOSE] === "function"
  );
}

export class Disposable {

  public static readonly Dispose: typeof DISPOSE = DISPOSE;
  public static readonly IsDisposed: typeof IS_DISPOSED = IS_DISPOSED;
  public static readonly Instance: typeof DISPOSABLE = DISPOSABLE;

  public static tryDispose(disposable: Unconstrained) {
    if (
      typeof disposable === "object" &&
      disposable !== null && // ye olde JavaScript bug
      (
        disposable instanceof Disposable ||
        typeof disposable[DISPOSE] === "function" ||
        typeof disposable[DISPOSABLE] !== "undefined"
      )
    ) {
      Disposable.dispose(disposable);
    }
  }

  public static dispose(disposable: DisposableType) {
    if (disposable instanceof Disposable) {
      disposable.dispose();
    } else if (isCustomDisposable(disposable)) {
      if (!disposable[IS_DISPOSED]) {
        disposable[DISPOSE]();
      } else {
        invariant(
          () => !disposable[IS_DISPOSED],
          "Disposable: Attempting to dispose of a disposed object.",
          false,
        );
      }
    } else {
      Disposable.dispose(disposable[DISPOSABLE]);
    }
  }

  #disposed = false;
  #disposeFunction: () => void;

  constructor(disposeFunction: () => void) {
    this.#disposeFunction = disposeFunction;
  }

  /**
   * Execute the internally stored dispose function once and only once.
   */
  public dispose() {
    if (!this.#disposed) {
      this.#disposed = true;
      this.#disposeFunction();
    } else {
      devOnly(() => {
        // eslint-disable-next-line no-console
        console.warn(
          `Disposable: trying to call dispose() on an already disposed object.`,
        );
      });
    }
  }

  public get isDisposed() {
    return this.#disposed;
  }
}
