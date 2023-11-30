import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/TransactionRepository';
import { TransactionID } from '../../../domain/TransactionID';
import { Transaction } from '../../../domain/Transaction';

@Injectable()
export class InMemoryTransactionRepository implements TransactionRepository {
  transactions: Map<TransactionID, Transaction> = new Map<
    TransactionID,
    Transaction
  >();
  async delete(id: TransactionID): Promise<void> {
    this.transactions.delete(id);
  }

  async find(id: TransactionID): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async save(transaction: Transaction): Promise<void> {
    this.transactions.set(transaction.id, transaction);
  }
}
