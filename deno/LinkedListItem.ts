/**
 * LinkedListItem.ts
 * @author Diao Zheng
 * @file An Item inside a linked list.
 */
import { isSome, Type as OptionType } from "./Option.ts";
import type { LinkedList } from "./LinkedList.ts";
export class LinkedListItem<T> {
  public previous: OptionType<LinkedListItem<T>>;
  public next: OptionType<LinkedListItem<T>>;
  public value: T;
  #list?: LinkedList<T>;
  #remove: (item: LinkedListItem<T>, token?: LinkedList<T>) => void;
  #add: (
    next: LinkedListItem<T>,
    item: LinkedListItem<T>,
    token?: LinkedList<T>
  ) => void;
  constructor(
    value: T,
    list: OptionType<LinkedList<T>>,
    remove: (item: LinkedListItem<T>, token?: LinkedList<T>) => void,
    add: (
      next: LinkedListItem<T>,
      item: LinkedListItem<T>,
      token?: LinkedList<T>
    ) => void
  ) {
    this.value = value;
    this.#list = list;
    this.#remove = remove;
    this.#add = add;
  }
  public popSelf = (): LinkedListItem<T> => {
    if (isSome(this.previous)) {
      this.previous.next = this.next;
    }
    if (isSome(this.next)) {
      this.next.previous = this.previous;
    }
    this.#remove(this, this.#list);
    this.#list = undefined;
    return this;
  };
  public addAfter = (value: T): void => {
    const next = new LinkedListItem(value, this.#list, this.#remove, this.#add);
    next.previous = this;
    next.next = this.next;
    if (isSome(this.next)) {
      this.next.previous = next;
    }
    this.next = next;
    this.#add(next, this, this.#list);
  };
  public addBefore = (value: T): void => {
    if (isSome(this.previous)) {
      this.previous.addAfter(value);
      return;
    }
    const prev = new LinkedListItem(value, this.#list, this.#remove, this.#add);
    prev.next = this;
    this.previous = prev;
    this.#add(this, prev, this.#list);
  };
}
