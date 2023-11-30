import { Transaction } from './Transaction';
import { TransactionID } from './TransactionID';

export abstract class TransactionRepository {
  public abstract find(id: TransactionID): Promise<Transaction | undefined>;
  public abstract save(transaction: Transaction): Promise<void>;
  public abstract delete(id: TransactionID): Promise<void>;
}
