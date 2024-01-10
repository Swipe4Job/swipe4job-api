import { Transaction } from '../Transaction';
import { TransactionId } from '../TransactionId';
import { TransactionCriteria } from './TransactionCriteria';

export abstract class TransactionRepository {
  public abstract search(
    criteria: TransactionCriteria,
  ): Promise<Transaction[] | undefined>;
  public abstract find(criteria: TransactionCriteria): Promise<Transaction[]>;
  public abstract save(transaction: Transaction): Promise<void>;
  public abstract delete(id: TransactionId): Promise<void>;
}
