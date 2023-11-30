import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions/transactions.controller';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';
import { TransactionRepository } from '../domain/TransactionRepository';
import { InMemoryTransactionRepository } from './repositories/in-memory-transaction-repository/in-memory-transaction-repository';

@Module({
  imports: [SharedProvidersModule],
  controllers: [TransactionsController],
  providers: [
    { provide: TransactionRepository, useClass: InMemoryTransactionRepository },
  ],
})
export class TransactionsModule {}
