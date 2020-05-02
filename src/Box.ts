/**
 * Box.ts
 * @author Diao Zheng
 * @file Represents a mutable box containing stuff
 */

//

 /**
  * A container for a reference to something.
  */
export class Box<T> implements Iterable<T> {
  public static empty<T>(): Box<T | undefined> {
    return new Box<T | undefined>(undefined);
  }

  public value: T | undefined;

  constructor(value?: T) {
    this.value = value;
  }

  public valueOf(): T {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.value!;
  }

  public setValueTo(other: Box<T>) {
    this.value = other.value;
  }

  public updateValueFrom(other: Box<T>) {
    other.value = this.value;
  }

  public update(value: T): T {
    const previousValue = this.valueOf();
    this.value = value;
    return previousValue;
  }

  public *[Symbol.iterator]() {
    if (this.value !== undefined) {
      yield this.value;
    }
  }
}
