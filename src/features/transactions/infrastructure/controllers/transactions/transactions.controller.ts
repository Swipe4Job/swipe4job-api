import { Body, Controller, Post } from '@nestjs/common';
import { ReqNewTransactionDTO } from './DTOs/NewTransaction/ReqNewTransactionDTO';
import { Transaction } from '../../../domain/Transaction';
import { TransactionID } from '../../../domain/TransactionID';
import { WalletAddress } from '../../../../../shared/domain/WalletAddress/WalletAddress';
import { TransactionRepository } from '../../../domain/TransactionRepository';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionRepository: TransactionRepository) {}

  @Post('/')
  async newTransaction(@Body() body: ReqNewTransactionDTO) {
    const transaction = new Transaction(
      new WalletAddress(body.destinationWallet),
      body.tokens,
    );
    if (body.id) {
      transaction.withId(new TransactionID(body.id));
    }

    await this.transactionRepository.save(transaction);

    return HttpResponse.success('Transaction saved').withData(transaction);
  }
}
