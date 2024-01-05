import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReqNewTransactionDTO } from './DTOs/NewTransaction/ReqNewTransactionDTO';
import { Transaction } from '../../../domain/Transaction';
import { TransactionID } from '../../../domain/TransactionID';
import { WalletAddress } from '../../../../../shared/domain/WalletAddress/WalletAddress';
import { TransactionRepository } from '../../../domain/TransactionRepository';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';
import { ClaimTokensRequest } from './DTOs/ClaimTokensRequest';
import { AuthTokenGuard } from '../../../../auth/infrastructure/auth-token/auth-token.guard';
import { InjectAuthToken } from '../../../../auth/infrastructure/auth-token/auth-token.decorator';
import { AuthTokenPayload } from '../../../../auth/domain/AuthToken';
import { PaymentService } from '../../services/payment/payment.service';
import { UserAuthToken } from '../../../../auth/domain/users/UserAuthToken';
import { PrismaProvider } from '../../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { TransactionState } from '../../../domain/TransactionState';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionRepository: TransactionRepository,
    private paymentService: PaymentService,
    private prisma: PrismaProvider,
  ) {}

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

  @Post('/claim')
  @UseGuards(AuthTokenGuard)
  async claimTokens(
    @Body() { sensorId }: ClaimTokensRequest,
    @InjectAuthToken() authTokenPayload: AuthTokenPayload<unknown>,
  ) {
    const userAuthToken = UserAuthToken.from(authTokenPayload);
    const transactions = await this.prisma.transactions.findMany({
      where: {
        sensor_data_entries: {
          every: {
            sensor_id: sensorId,
          },
        },
        state: {
          not: {
            equals: TransactionState.CLAIMED().value,
          },
        },
      },
    });

    const totalTokens = transactions
      .map((t) => t.tokens)
      .reduce((accumulator, current) => accumulator + current);

    await this.paymentService.makePayment(
      userAuthToken.payload.data.walletAddress,
      totalTokens,
    );

    return HttpResponse.success('Tokens claimed');
  }
}
