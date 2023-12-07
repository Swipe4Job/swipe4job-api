import { InvalidArgument } from '../InvalidArgument';

export type Primitives = number | boolean | string | Date;

export class ValueObject<T extends Primitives> {
  constructor(private _value: T) {
    if (this._value === null || this._value === undefined) {
      throw new InvalidArgument('Invalid value, it must be defined');
    }
  }

  public get value(): T {
    return this._value;
  }

  equals(value: ValueObject<T>): boolean {
    return value.value === this.value;
  }
}
