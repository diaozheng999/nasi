/**
 * Semaphore.test.ts
 * @author Diao Zheng
 * @file Async Semaphore test cases
 */

import { Semaphore } from "../Semaphore";

// We want to create a promise that's executed as we go along.
/* eslint-disable @typescript-eslint/no-misused-promises */
// FIXME: remove this override after validating tests
/* eslint-disable jest/valid-expect, jest/no-try-expect */

test("should not be initialisable with negative numbers", () => {
  expect(() => new Semaphore(0)).toThrowError();
  expect(() => new Semaphore(-1)).toThrowError();
  expect(() => new Semaphore(-Infinity)).toThrowError();
  expect(() => new Semaphore(NaN)).toThrowError();
  // allowed, but dumb. Use at your own peril
  expect(() => new Semaphore(Infinity)).not.toThrowError();
});

test("mutex-style blocking", async () => {
  const executionOrder = jest.fn();

  const semaphore = new Semaphore(1);

  const f1 = new Promise(async (resolve) => {
    executionOrder(0);
    await semaphore.wait();
    executionOrder(1);
    setTimeout(() => {
      executionOrder(2);
      semaphore.signal();
      resolve(1);
    }, 100);
  });
  const f2 = new Promise(async (resolve) => {
    executionOrder(3);
    await semaphore.wait();
    executionOrder(4);
    setTimeout(() => {
      executionOrder(5);
      semaphore.signal();
      resolve(2);
    }, 100);
  });

  await Promise.all([f1, f2]);

  expect(executionOrder).toBeCalledTimes(6);
  expect(executionOrder.mock.calls[0][0]).toBe(0);
  expect(executionOrder.mock.calls[1][0]).toBe(3);
  expect(executionOrder.mock.calls[2][0]).toBe(1);
  expect(executionOrder.mock.calls[3][0]).toBe(2);
  expect(executionOrder.mock.calls[4][0]).toBe(4);
  expect(executionOrder.mock.calls[5][0]).toBe(5);
});

test("semaphore blocking", async () => {
  const executionOrder = jest.fn();

  const semaphore = new Semaphore(2);

  const f1 = new Promise(async (resolve) => {
    executionOrder(0);
    await semaphore.wait();
    executionOrder(1);
    setTimeout(() => {
      executionOrder(2);
      semaphore.signal();
      resolve(1);
    }, 100);
  });
  const f2 = new Promise(async (resolve) => {
    executionOrder(3);
    await semaphore.wait();
    executionOrder(4);
    setTimeout(() => {
      executionOrder(5);
      semaphore.signal();
      resolve(2);
    }, 100);
  });

  const f3 = new Promise(async (resolve) => {
    executionOrder(6);
    await semaphore.wait();
    executionOrder(7);
    setTimeout(() => {
      executionOrder(8);
      semaphore.signal();
      resolve(2);
    }, 100);
  });

  await Promise.all([f1, f2, f3]);

  expect(executionOrder).toBeCalledTimes(9);

  expect(executionOrder.mock.calls[0][0]).toBe(0);
  expect(executionOrder.mock.calls[1][0]).toBe(3);
  expect(executionOrder.mock.calls[2][0]).toBe(6);
  expect(executionOrder.mock.calls[3][0]).toBe(1);
  expect(executionOrder.mock.calls[4][0]).toBe(4);
  expect(executionOrder.mock.calls[5][0]).toBe(2);
  expect(executionOrder.mock.calls[6][0]).toBe(7);
  expect(executionOrder.mock.calls[7][0]).toBe(5);
  expect(executionOrder.mock.calls[8][0]).toBe(8);

});

test("semaphore timeout rejection", async () => {
  const executionOrder = jest.fn();
  const semaphore = new Semaphore(1);
  const f1 = (async () => {
    await semaphore.wait();
    executionOrder(1);
    await Semaphore.sleep(100);
    executionOrder(2);
    semaphore.signal();
  })();

  const tryWait = semaphore.wait(10);

  expect(f1).resolves.toBeUndefined();
  expect(tryWait).rejects.toBeUndefined();

  try {
    const p = await f1;
    await tryWait;
    expect(p).toBeUndefined();
  } catch (e) {
    expect(e).toBeUndefined();
  }
});

test("semaphore success", () => {
  jest.useFakeTimers();
  const executionOrder = jest.fn();
  const semaphore = new Semaphore(1);
  const f1 = (async () => {
    await semaphore.wait();
    executionOrder(1);
    await Semaphore.sleep(10);
    executionOrder(2);
    semaphore.signal();
  })();

  const tryWait = semaphore.wait(100);
  jest.runAllTimers();

  expect(f1).resolves.toBeUndefined();
  expect(tryWait).resolves.toBeUndefined();
  jest.useRealTimers();
});

test("semaphore immediate reject", async () => {
  const semaphore = new Semaphore(1);
  semaphore.wait();
  await expect(semaphore.wait(-1)).rejects.toBeUndefined();
});

test("semaphore debug identity", () => {
  const semaphore = new Semaphore(1, "debugName");
  expect(semaphore.identity).toBe("debugName");
});
