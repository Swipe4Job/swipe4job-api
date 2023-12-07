import { ValueObject } from './ValueObject';
import { InvalidArgument } from '../InvalidArgument';

export class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    if (typeof (value as any) !== 'string') {
      throw new InvalidArgument(
        `Provided value must be a string not a ${typeof value}`,
      );
    }
  }
}
