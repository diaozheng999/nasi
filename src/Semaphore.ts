/**
 * Semaphore.ts
 * @author Diao Zheng
 * @file Async semaphore useful for async functions and promises.
 */

import { LinkedList } from "./LinkedList";

 /**
  * An asynchronous semaphore implementation that is useful when dealing with
  * promises.
  */
export class Semaphore {
  /**
   * Returns a promise that resolves after a while.
   * @param duration number of milliseconds to sleep for
   */
  public static sleep(duration: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  private value: number;
  private debugName: string = "";

  private pendingWaits: LinkedList<() => void> = new LinkedList();

  constructor(initialValue: number, debugName?: string) {
    // this will throw an error if inputValue is NaN
    if (!(initialValue > 0)) {
      throw new Error(
        "Semaphores cannot be initialised with a non-positive number.",
      );
    }

    this.value = initialValue;
    if (debugName) {
      this.debugName = debugName;
    }
  }

  /** The debug identity helpful for debugging */
  public get identity() {
    return this.debugName;
  }

  /**
   * The P (proberen) operation.
   *
   * Use this ONLY as part of a promise or async function.
   *
   * @param rejectAfter if truthy (i.e. non-0), will reject the promise after
   * the stated number of milliseconds. In an async function, this will equate
   * to an exception. if truthy and < 0, will reject immediately should lock
   * fail to acquire.
   *
   * @returns a promise that resolves when the lock has been successfully
   * acquired, or rejects if the lock has not been acquired after `rejectAfter`
   * milliseconds.
   *
   * When resolved, this resolves to an object that can call `dispose` to
   * release the lock.
   */
  public wait(rejectAfter?: number): Promise<void> {
    this.tryFlushPendingWaits();
    if (this.value) {
      --this.value;
      return Promise.resolve();
    } else if (rejectAfter && rejectAfter < 0) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      if (rejectAfter) {
        let rejected = false;
        const timeout = setTimeout(() => {
          rejected = true;
          reject();
        }, rejectAfter);
        this.pendingWaits.push(
          () => {
            if (!rejected) {
              clearTimeout(timeout);
              resolve();
            }
          },
        );
      } else {
        this.pendingWaits.push(resolve);
      }
    });
  }

  /**
   * The V (verhogen) operation.
   */
  public signal(): void {
    ++this.value;
    this.tryFlushPendingWaits();
  }

  private tryFlushPendingWaits = () => {
    while (this.value && this.pendingWaits.length) {
      const wait = this.pendingWaits.shift();
      if (wait) {
        --this.value;
        wait();
      }
    }
  }

}
