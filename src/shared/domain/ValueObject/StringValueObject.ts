import { ValueObject } from './ValueObject';

export class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}
