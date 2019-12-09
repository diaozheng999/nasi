/**
 * LinkedList.ts
 * @author Diao Zheng
 * @file A doubly-linked list data structure
 */

import { LinkedListItem } from "./LinkedListItem";
import { isNone, isSome, Type as Option } from "./Option";

export class LinkedList<T> implements Iterable<T> {
  public length = 0;

  private head: Option<LinkedListItem<T>>;
  private tail: Option<LinkedListItem<T>>;

  constructor(...items: T[]) {
    for (const item of items) {
      this.addToEnd(item);
    }
  }

  public getHead(): Option<LinkedListItem<T>> {
    return this.head;
  }

  public push = (value: T) => this.addToEnd(value);
  public pop = () => this.removeFromEnd();
  public shift = () => this.removeFromFront();
  public unshift = (value: T) => this.addToFront(value);

  public addToEnd = (value: T) => {
    const item = new LinkedListItem(value);
    item.previous = this.tail;
    if (isSome(this.tail)) {
      this.tail.next = item;
    } else {
      this.head = item;
    }
    this.tail = item;
    ++this.length;
  }

  public addToFront = (value: T) => {
    const item = new LinkedListItem(value);
    item.next = this.head;
    if (isSome(this.head)) {
      this.head.previous = item;
    } else {
      this.tail = item;
    }
    this.head = item;
    ++this.length;
  }

  public removeFromEnd = () => {
    if (isNone(this.tail)) {
      return;
    }
    const item = this.tail.popSelf();
    this.tail = item.previous;
    --this.length;
    return item.value;
  }

  public removeFromFront = () => {
    if (isNone(this.head)) {
      return;
    }
    const item = this.head.popSelf();
    this.head = item.next;
    --this.length;
    return item.value;
  }

  public drain(effect: (value: T) => void) {
    let item: Option<T>;
    // tslint:disable-next-line: no-conditional-assignment
    while (item = this.removeFromFront()) {
      effect(item);
    }
  }

  public *[Symbol.iterator]() {
    for (let i = this.head; isSome(i); i = i.next) {
      yield i.value;
    }
  }
}
