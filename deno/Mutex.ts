/**
 * Mutex.ts
 * @author Diao Zheng
 * @file Async mutex
 * @barrel export Lock
 */

import { devOnly } from "./Dev.ts";
import { Disposable } from "./Disposable.ts";
import { Semaphore } from "./Semaphore.ts";
import { Opaque } from "./Types.ts";

export type Lock = Opaque<Disposable, typeof Semaphore>;

/**
 * A Mutex that guards against an exclusive resource when using async functions
 * or promises.
 *
 * Although this is equivalent to a binary semaphore, IT IS NOT A SEMAPHORE.
 */
export class Mutex {
  private semaphore: Semaphore;

  constructor(debugName?: string) {
    this.semaphore = new Semaphore(1, debugName);
  }

  /** The debug identity helpful for debugging */
  public get identity() {
    return this.semaphore.identity;
  }

  /**
   * Blocks until the "writelock" aka blocking operation has finished.
   * @param rejectAfter the number of milliseconds to wait before rejecting the
   * lock attempt
   * @param dependencies a list of dependent locks to prevent some deadlocks.
   */
  public async UNSAFE_acquireReadonlyAccess(
    rejectAfter?: number,
    dependencies?: Lock[],
  ) {
    const lock = await this.acquire(rejectAfter, dependencies);
    lock.dispose();
  }

  /** @deprecated use `UNSAFE_acquireReadonlyAccess` instead. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public async UNSAFE_AcquireReadonlyAccess(
    rejectAfter?: number,
    dependencies?: Lock[],
  ) {
    return this.UNSAFE_acquireReadonlyAccess(rejectAfter, dependencies);
  }

  public async acquire(
    rejectAfter?: number,
    dependencies?: Lock[],
  ): Promise<Lock> {
    const lock = new Disposable(
      dependencies
        ? this.guardedRelease.bind(this, dependencies)
        : this.release.bind(this),
    ) as Lock;
    await this.semaphore.wait(rejectAfter);
    return lock;
  }

  public async lock<T>(fn: () => Promise<T>, rejectAfter?: number): Promise<T> {
    await this.acquire(rejectAfter);
    try {
      const resolved = await fn();
      return resolved;
    } finally {
      this.release();
    }
  }

  private release() {
    this.semaphore.signal();
  }

  private guardedRelease(dependencies: Disposable[]) {
    devOnly(() => {
      for (const dependency of dependencies) {
        if (dependency.isDisposed) {
          throw new Error(
            "Semaphore: Trying to release a lock after an earlier lock has " +
              "been released. This may potentially lead to a deadlock.",
          );
        }
      }
    });
    this.release();
  }
}
