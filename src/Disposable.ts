/**
 * Disposable.ts
 * @author Diao Zheng
 * @file Represents an object that can be disposed once.
 */

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
    } else if (__DEV__) {
      // tslint:disable-next-line: no-console
      console.warn(
        `Disposable: trying to call dispose() on an already disposed object.`,
      );
    }
  }

  public get isDisposed() {
    return this.disposed;
  }
}
