/**
 * LinkedListItem.ts
 * @author Diao Zheng
 * @file An Item inside a linked list.
 */

// @barrel ignore

import { isSome, Type as OptionType } from "./Option";

export class LinkedListItem<T> {
  public previous: OptionType<LinkedListItem<T>>;
  public next: OptionType<LinkedListItem<T>>;

  public value: T;

  constructor(value: T) {
    this.value = value;
  }

  public popSelf = () => {
    if (isSome(this.previous)) {
      this.previous.next = this.next;
    }

    if (isSome(this.next)) {
      this.next.previous = this.previous;
    }

    return this;
  }
}
