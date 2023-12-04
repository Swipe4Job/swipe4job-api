import { PrismaProvider } from '../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { TransactionState } from '../domain/TransactionState';
import { ApplicationLogger } from '../../../shared/infrastructure/services/application-logger/application-logger';
import { PersistenceError } from '../../../shared/domain/PersistenceError';

/**
 * To migrate sensor data its necessary to add the transaction id.
 * The problem is that if we don't set a default value the models
 * cannot be related migration cannot be done.
 *
 * To achieve this. Create an empty transaction and set its id as a default value
 * for sensor data table.
 *
 * Once the migration is complete remove this service and empty transaction
 */
@Injectable()
export class TransactionMigrationService implements OnModuleInit {
  constructor(
    private prisma: PrismaProvider,
    private logger: ApplicationLogger,
  ) {}

  /**
   * Create an empty transaction. This is done to allow the migration
   *
   * @throws
   */
  async saveEmptyTransaction() {
    let result;
    try {
      result = await this.prisma.transactions.findFirst({
        where: {
          id: '',
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error getting empty transaction');
    }

    if (result) {
      this.logger.log(
        'Empty already transaction saved',
        'Transaction Migration Service',
      );
      return;
    }

    try {
      await this.prisma.transactions.create({
        data: {
          id: '',
          transaction_date: new Date(),
          state: TransactionState.PENDING().value,
          tokens: 0,
          destination_wallet: '',
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error saving empty transaction');
    }
    this.logger.log('Empty transaction saved', 'Transaction Migration Service');
  }

  async onModuleInit(): Promise<any> {
    await this.saveEmptyTransaction();
  }
}
