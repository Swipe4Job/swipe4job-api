import { DateTimeValueObject } from '../../../shared/domain/ValueObject/DateTimeValueObject';

export class TransactionDate extends DateTimeValueObject {
  constructor(value: Date) {
    super(value);
  }
}
