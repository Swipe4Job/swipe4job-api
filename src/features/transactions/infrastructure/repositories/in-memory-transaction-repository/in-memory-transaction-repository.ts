import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/TransactionRepository/TransactionRepository';
import { TransactionId } from '../../../domain/TransactionId';
import { Transaction } from '../../../domain/Transaction';

@Injectable()
export class InMemoryTransactionRepository {
  transactions: Map<TransactionId, Transaction> = new Map<
    TransactionId,
    Transaction
  >();
  async delete(id: TransactionId): Promise<void> {
    this.transactions.delete(id);
  }

  async find(id: TransactionId): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async save(transaction: Transaction): Promise<void> {
    this.transactions.set(transaction.id, transaction);
  }
}
