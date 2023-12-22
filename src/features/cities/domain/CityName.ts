import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';

export class CityName extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (value == '') {
      throw new InvalidArgument(
        'Invalid citi name it cannot be an empty string',
      );
    }
  }
}
