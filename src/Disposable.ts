/**
 * Disposable.ts
 * @author Diao Zheng
 * @file Represents an object that can be disposed once.
 */

import { invariant } from "./Contract";
import { devOnly } from "./Dev";

const DISPOSE = Symbol.for("nasi/DISPOSE");
const IS_DISPOSED = Symbol.for("nasi/IS_DISPOSED");
const DISPOSABLE = Symbol.for("nasi/DISPOSABLE");

// @barrel export ICustomDisposable

export interface ICustomDisposable {
  [IS_DISPOSED]: boolean;
  [DISPOSE](): void;
}

// @barrel export IDisposable
export interface IDisposable {
  [DISPOSABLE]: Disposable;
}

export type DisposableType =
  | IDisposable
  | ICustomDisposable
  | Disposable
;

function isCustomDisposable(
  disposable: DisposableType,
): disposable is ICustomDisposable {
  return (
    disposable.hasOwnProperty(IS_DISPOSED) &&
    disposable.hasOwnProperty(DISPOSE)
  );
}

export class Disposable {

  public static readonly Dispose: typeof DISPOSE = DISPOSE;
  public static readonly IsDisposed: typeof IS_DISPOSED = IS_DISPOSED;
  public static readonly Instance: typeof DISPOSABLE = DISPOSABLE;

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

  private disposed: boolean = false;
  private disposeFunction: () => void;

  constructor(disposeFunction: () => void) {
    this.disposeFunction = disposeFunction;
  }

  /**
   * Execute the internally stored dispose function once and only once.
   */
  public dispose() {
    if (!this.disposed) {
      this.disposed = true;
      this.disposeFunction();
    } else {
      devOnly(() => {
        // tslint:disable-next-line: no-console
        console.warn(
          `Disposable: trying to call dispose() on an already disposed object.`,
        );
      });
    }
  }

  public get isDisposed() {
    return this.disposed;
  }
}
