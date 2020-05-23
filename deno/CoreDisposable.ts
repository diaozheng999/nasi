/**
 * CoreDisposable.ts
 * @author Diao Zheng
 * @file A base class for Disposable interfaces that simply implements the
 * IDisposable interface.
 */

import { Disposable, ICustomDisposable } from "./Disposable.ts";

// tslint is not really equipped for TypeScript 3.8
// tslint:disable

export abstract class CoreDisposable implements ICustomDisposable {
  #isDisposed = false;

  public get [Disposable.IsDisposed]() {
    return this.#isDisposed;
  }

  public abstract [Disposable.Dispose](): void;
}
