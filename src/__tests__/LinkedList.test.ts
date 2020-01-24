/**
 * LinkedList.test.ts
 * @author Diao Zheng
 * @file test cases for linked lists
 */

import { LinkedList } from "../LinkedList";

test("empty list", () => {
  const list = new LinkedList();
  expect(list.length).toBe(0);
});

test("list iteration", () => {
  const list = new LinkedList(1, 2, 3, 4, 5);
  expect(list.length).toBe(5);

  const expectation: { [i: number]: number } = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  };

  for (const item of list) {
    expect(expectation[item]).toBe(item);
  }
});

test("list add and drain", () => {
  const list = new LinkedList(1, 2, 3, 4, 5);
  expect(list.length).toBe(5);
  const effect = jest.fn();

  list.drain(effect);

  expect(list.length).toBe(0);
  expect(effect).toBeCalledTimes(5);
  expect(effect.mock.calls).toMatchObject([
    [1],
    [2],
    [3],
    [4],
    [5],
  ]);
});

test("list add to front", () => {
  const list = new LinkedList();
  list.unshift(1);
  list.unshift(2);
  list.unshift(3);
  list.unshift(4);
  list.unshift(5);
  const result = Array.from(list);

  expect(result).toStrictEqual([5, 4, 3, 2, 1]);
  expect(list.pop()).toBe(1);
  expect(list.pop()).toBe(2);
  expect(list.pop()).toBe(3);
  expect(list.pop()).toBe(4);
  expect(list.pop()).toBe(5);
  expect(list.pop()).toBeUndefined();
});

test("list add to end", () => {
  const list = new LinkedList();
  list.push(1);
  list.push(2);
  list.push(3);
  list.push(4);
  list.push(5);
  const result = Array.from(list);

  expect(result).toStrictEqual([1, 2, 3, 4, 5]);
  expect(list.shift()).toBe(1);
  expect(list.shift()).toBe(2);
  expect(list.shift()).toBe(3);
  expect(list.shift()).toBe(4);
  expect(list.shift()).toBe(5);
  expect(list.shift()).toBeUndefined();
});

test("iterator repetition", () => {
  const list = new LinkedList();
  list.push(1);
  list.push(2);
  list.push(3);

  let expectation = 0;
  for (const item of list) {
    expect(item).toBe(++expectation);
  }

  expectation = 0;
  for (const item of list) {
    expect(item).toBe(++expectation);
  }
});

test("iterator empty repetition", () => {
  const list = new LinkedList();
  list.push(1);
  list.push(2);
  list.push(3);

  let expectation = 0;
  for (const item of list) {
    expect(item).toBe(++expectation);
  }

  list.pop();
  list.pop();
  list.pop();
  list.push(4);
  list.push(5);

  for (const item of list) {
    expect(item).toBe(++expectation);
  }
  expect(expectation).toBe(5);
});

test("iterator add and remove one item", () => {
  const list = new LinkedList();
  list.push(1);

  let expectation = 0;
  for (const item of list) {
    expect(item).toBe(++expectation);
  }

  list.removeFromFront();
  console.warn(list);
  list.push(2);

  for (const item of list) {
    expect(item).toBe(++expectation);
  }
  expect(expectation).toBe(2);
});
