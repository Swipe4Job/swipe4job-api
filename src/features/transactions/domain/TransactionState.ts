import { ValueObject } from '../../../shared/domain/ValueObject/ValueObject';
import { InvalidTransactionState } from './InvalidTransactionState';

export class TransactionState extends ValueObject<string> {
  private readonly allowedValues = ['PENDING', 'CLAIMED'];
  constructor(value: string) {
    super(value);
    if (!this.allowedValues.includes(this.value)) {
      throw new InvalidTransactionState();
    }
  }

  public static PENDING(): TransactionState {
    return new TransactionState('PENDING');
  }
  public static CLAIMED(): TransactionState {
    return new TransactionState('CLAIMED');
  }
}
