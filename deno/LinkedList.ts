/**
 * LinkedList.ts
 * @author Diao Zheng
 * @file A doubly-linked list data structure
 */
import { LinkedListItem } from "./LinkedListItem.ts";
import { isNone, isSome, Type as Option } from "./Option.ts";
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
  public push = (value: T): void => this.addToEnd(value);
  public pop = (): Option<T> => this.removeFromEnd();
  public shift = (): Option<T> => this.removeFromFront();
  public unshift = (value: T): void => this.addToFront(value);
  #remove = (value: LinkedListItem<T>, list?: LinkedList<T>) => {
    if (list !== this) {
      return;
    }
    if (!--this.length) {
      this.head = undefined;
      this.tail = undefined;
    } else if (value === this.head) {
      this.head = value.next;
    } else if (value === this.tail) {
      this.tail = value.previous;
    }
  };
  #add = (
    next: LinkedListItem<T>,
    node: LinkedListItem<T>,
    list?: LinkedList<T>
  ) => {
    if (list !== this) {
      return;
    }
    ++this.length;
    if (node === this.tail) {
      this.tail = next;
    }
    if (next === this.head) {
      this.head = node;
    }
  };
  #addOne = (value: T): void => {
    const item = new LinkedListItem(value, this, this.#remove, this.#add);
    this.head = item;
    this.tail = item;
    this.length = 1;
  };
  public addToEnd = (value: T): void => {
    if (isSome(this.tail)) {
      this.tail.addAfter(value);
    } else {
      this.#addOne(value);
    }
  };
  public addToFront = (value: T): void => {
    if (isSome(this.head)) {
      this.head.addBefore(value);
    } else {
      this.#addOne(value);
    }
  };
  public recomputeLength = (): number => {
    this.length = 0;
    for (let i = this.head; isSome(i); i = i.next) {
      ++this.length;
    }
    return this.length;
  };
  public removeFromEnd = (): Option<T> => {
    if (isNone(this.tail)) {
      return;
    }
    const item = this.tail.popSelf();
    return item.value;
  };
  public removeFromFront = (): Option<T> => {
    if (isNone(this.head)) {
      return;
    }
    const item = this.head.popSelf();
    return item.value;
  };
  public drain(effect: (value: T) => void): void {
    let item: Option<T>;
    // tslint:disable-next-line: no-conditional-assignment
    while ((item = this.removeFromFront())) {
      effect(item);
    }
  }
  public *[Symbol.iterator](): Iterator<T> {
    for (let i = this.head; isSome(i); i = i.next) {
      yield i.value;
    }
  }
}
