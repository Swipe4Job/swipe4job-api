import { UUIDValueObject } from '../../../shared/domain/ValueObject/UUIDValueObject';
import { InvalidUUID } from '../../../shared/domain/ValueObject/InvalidUUID';

export class TransactionID extends UUIDValueObject {
  constructor(value: string) {
    try {
      super(value);
    } catch (error) {
      if (error instanceof InvalidUUID) {
        throw new Error('Invalid transaction ID it must be an UUID');
      }
    }
  }
}
