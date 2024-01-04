import { NonEmptyStringValueObject } from '../../../../shared/domain/ValueObject/NonEmptyStringValueObject';
import { randomBytes } from 'node:crypto';

export class SignCode extends NonEmptyStringValueObject {
  public static random(): SignCode {
    const now = Date.now();
    const bytes = randomBytes(20);
    return new SignCode(`${now}-${bytes.toString('base64')}`);
  }
}
