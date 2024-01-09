import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions/transactions.controller';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';
import { TransactionRepository } from '../domain/TransactionRepository';
import { PrismaTransactionRepository } from './repositories/prisma-transaction-repository/prisma-transaction-repository';
import { TransactionMigrationService } from './transaction-migration-service';
import { PaymentService } from './services/payment/payment.service';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import { ClaimTokens } from '../application/ClaimTokens';

@Module({
  imports: [SharedProvidersModule, AuthModule],
  controllers: [TransactionsController],
  providers: [
    { provide: TransactionRepository, useClass: PrismaTransactionRepository },
    TransactionMigrationService,
    PaymentService,
    ClaimTokens,
  ],
})
export class TransactionsModule {}
