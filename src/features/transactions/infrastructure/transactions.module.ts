import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions/transactions.controller';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';
import { TransactionRepository } from '../domain/TransactionRepository';
import { PrismaTransactionRepository } from './repositories/prisma-transaction-repository/prisma-transaction-repository';
import { TransactionMigrationService } from './transaction-migration-service';

@Module({
  imports: [SharedProvidersModule],
  controllers: [TransactionsController],
  providers: [
    { provide: TransactionRepository, useClass: PrismaTransactionRepository },
    TransactionMigrationService,
  ],
})
export class TransactionsModule {}
