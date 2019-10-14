/**
 * Disposable.ts
 * @author Diao Zheng
 * @file Represents an object that can be disposed once.
 */

import { devOnly } from "./Dev";

export class Disposable {
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
