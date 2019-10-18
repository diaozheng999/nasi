/**
 * Box.ts
 * @author Diao Zheng
 * @file Represents a mutable box containing stuff
 */

export class Box<T> {
  public static empty<T>(): Box<T | undefined> {
    return new Box<T | undefined>(undefined);
  }

  public value: T;

  constructor(value: T) {
    this.value = value;
  }

  public valueOf() {
    return this.value;
  }

  public setValueTo(other: Box<T>) {
    this.value = other.value;
  }

  public updateValueFrom(other: Box<T>) {
    other.value = this.value;
  }
}
