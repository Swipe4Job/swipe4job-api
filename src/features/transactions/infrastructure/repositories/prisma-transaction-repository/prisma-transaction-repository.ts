import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/TransactionRepository';
import { TransactionID } from '../../../domain/TransactionID';
import { Transaction } from '../../../domain/Transaction';
import { PrismaProvider } from '../../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { ApplicationLogger } from '../../../../../shared/infrastructure/services/application-logger/application-logger';
import { PersistenceError } from '../../../../../shared/domain/PersistenceError';
import { WalletAddress } from '../../../../../shared/domain/WalletAddress/WalletAddress';
import { TransactionDate } from '../../../domain/TransactionDate';
import { TransactionState } from '../../../domain/TransactionState';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(
    private prisma: PrismaProvider,
    private logger: ApplicationLogger,
  ) {}
  async delete(id: TransactionID): Promise<void> {
    try {
      await this.prisma.transactions.deleteMany({
        where: {
          id: id.value,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error removing transaction');
    }
  }

  async find(id: TransactionID): Promise<Transaction | undefined> {
    let result;
    try {
      result = await this.prisma.transactions.findFirst({
        where: {
          id: id.value,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error removing transaction');
    }

    if (!result) {
      return;
    }

    return new Transaction(
      new WalletAddress(result.destination_wallet),
      result.tokens,
    )
      .withId(new TransactionID(result.id))
      .withDate(new TransactionDate(result.transaction_date))
      .withState(new TransactionState(result.state));
  }

  async save(transaction: Transaction): Promise<void> {
    const transactionExists = !!(await this.find(transaction.id));
    if (transactionExists) {
      await this.prisma.transactions.update({
        data: {
          destination_wallet: transaction.destinationWallet.value,
          tokens: transaction.tokens,
          transaction_date: transaction.date.value,
          state: transaction.state.value,
        },
        where: {
          id: transaction.id.value,
        },
      });
    } else {
      await this.prisma.transactions.create({
        data: {
          id: transaction.id.value,
          destination_wallet: transaction.destinationWallet.value,
          tokens: transaction.tokens,
          transaction_date: transaction.date.value,
          state: transaction.state.value
        },
      });
    }
  }
}
