import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/TransactionRepository/TransactionRepository';
import { TransactionId } from '../../../domain/TransactionId';
import { Transaction } from '../../../domain/Transaction';
import { PrismaProvider } from '../../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { ApplicationLogger } from '../../../../../shared/infrastructure/services/application-logger/application-logger';
import { PersistenceError } from '../../../../../shared/domain/PersistenceError';
import { TransactionDate } from '../../../domain/TransactionDate';
import { TransactionState } from '../../../domain/TransactionState';
import { SensorId } from '../../../../sensors/domain/SensorId';
import { TransactionCriteria } from '../../../domain/TransactionRepository/TransactionCriteria';
import { TransactionNotFound } from '../../../domain/TransactionRepository/TransactionNotFound';
import { PrismaCriteriaService } from '../../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { WalletAddress } from '../../../../../shared/domain/WalletAddress/WalletAddress';
import { ByTransactionId } from '../../../domain/TransactionRepository/ByTransactionId';
import { FieldMapper, FieldMapping } from '../../../../../shared/domain/Criteria/FieldMapper';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  private fieldMapping: FieldMapping = {
    sensor_id: 'sensor_uuid',
  };

  constructor(
    private prisma: PrismaProvider,
    private logger: ApplicationLogger,
    private prismaCriteria: PrismaCriteriaService,
  ) {}

  async search(
    criteria: TransactionCriteria,
  ): Promise<Transaction[] | undefined> {
    const mapCriteria = FieldMapper.mapCriteria(this.fieldMapping, criteria);
    let result;
    const filters = this.prismaCriteria.convertFilters(mapCriteria.filters);
    const orders = this.prismaCriteria.convertOrders(mapCriteria.orders);

    this.logger.debug(filters);

    try {
      result = await this.prisma.transactions.findMany({
        where: filters,
        orderBy: orders,
        take: mapCriteria.limit.value || undefined,
        skip: mapCriteria.skip.value || undefined,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error searching transaction');
    }

    if (result.length === 0) {
      return;
    }

    return result.map((result) => {
      const transaction = new Transaction(
        new SensorId(result.sensor_uuid),
        result.tokens,
      )
        .withId(new TransactionId(result.id))
        .withDate(new TransactionDate(result.transaction_date))
        .withState(new TransactionState(result.state));
      if (result.destination_wallet) {
        transaction.withDestinationWallet(
          new WalletAddress(result.destination_wallet),
        );
      }

      return transaction;
    });
  }

  async delete(id: TransactionId): Promise<void> {
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

  async find(criteria: TransactionCriteria): Promise<Transaction[]> {
    const transactions = await this.search(criteria);
    if (!transactions) {
      throw new TransactionNotFound();
    }

    return transactions;
  }

  async save(transaction: Transaction): Promise<void> {
    const transactionExists = !!(await this.search(
      new ByTransactionId(transaction.id),
    ));
    if (transactionExists) {
      try {
        await this.prisma.transactions.update({
          data: {
            destination_wallet: transaction.destinationWallet?.value,
            tokens: transaction.tokens,
            transaction_date: transaction.date.value,
            state: transaction.state.value,
          },
          where: {
            id: transaction.id.value,
          },
        });
      } catch (err) {
        this.logger.error(err);
        throw new PersistenceError('Error updating transaction');
      }
    } else {
      try {
        await this.prisma.transactions.create({
          data: {
            id: transaction.id.value,
            sensor_uuid: transaction.sensorId.value,
            destination_wallet: transaction.destinationWallet?.value || '',
            tokens: transaction.tokens,
            transaction_date: transaction.date.value,
            state: transaction.state.value,
          },
        });
      } catch (err) {
        this.logger.error(err);
        throw new PersistenceError('Error saving transaction');
      }
    }
  }
}
