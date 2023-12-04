import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { ValueObject } from '../../../shared/domain/ValueObject/ValueObject';

export class PhoneNumber extends StringValueObject {
  private _prefix: string;
  constructor(prefix: string, value: string) {
    super(value);
    this._prefix = prefix;
  }
  equals(value: ValueObject<string>): boolean {
    return super.equals(value);
  }

  private validatePrefix(value: string) {}
}
