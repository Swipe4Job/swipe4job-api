import { StringValueObject } from './StringValueObject';
import { InvalidArgument } from '../InvalidArgument';

export class NonEmptyStringValueObject extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (value === '') {
      throw new InvalidArgument('Invalid argument string cannot be empty');
    }
  }
}
