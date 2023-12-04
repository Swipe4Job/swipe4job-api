import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { ValueObject } from '../../../shared/domain/ValueObject/ValueObject';
import { InvalidPhoneNumberPrefix } from './InvalidPhoneNumberPrefix';

export class PhoneNumber extends StringValueObject {
  private _prefix: string;
  constructor(prefix: string, value: string) {
    super(value);
    this._prefix = prefix;
  }
  equals(value: ValueObject<string>): boolean {
    return super.equals(value);
  }

  private validatePrefix(value: string) {
    let isValid = false;
    const validPrefixPatterns = [/^\d{1,3}-\d{3}$/, /^\d{1,3}$/];
    for (const validPrefixPattern of validPrefixPatterns) {
      isValid = isValid || validPrefixPattern.test(value);
    }

    if (!isValid) {
      throw new InvalidPhoneNumberPrefix();
    }
  }
}
