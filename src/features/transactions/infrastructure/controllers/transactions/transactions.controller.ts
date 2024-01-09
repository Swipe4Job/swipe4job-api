import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ReqNewTransactionDTO } from './DTOs/NewTransaction/ReqNewTransactionDTO';
import { Transaction } from '../../../domain/Transaction';
import { TransactionId } from '../../../domain/TransactionId';
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
import { OnEvent } from '@nestjs/event-emitter';
import { TokensClaimed } from '../../../domain/TokensClaimed';
import { ClaimStarted } from '../../../domain/ClaimStarted';
import { SensorId } from '../../../../sensors/domain/SensorId';

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
      new SensorId(body.sensorId),
      body.tokens,
    );
    if (body.id) {
      transaction.withId(new TransactionId(body.id));
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

  @Post('/mint')
  async mint(@Body() body: any) {
    await this.paymentService.mint(body.to, body.amount);

    return HttpResponse.success('Success mint');
  }

  @Post('/burn')
  async burn(@Body() body: any) {
    await this.paymentService.burn(body.amount);

    return HttpResponse.success('Success burn');
  }

  @Get('/balance')
  async balance(@Query() body: any) {
    const balance = await this.paymentService.balance(body.address);

    return HttpResponse.success('Success balance').withData({ balance });
  }

  @OnEvent(ClaimStarted.NAME)
  claimStarted(event: ClaimStarted) {

  }

  @OnEvent(TokensClaimed.NAME)
  tokensClaimed(event: TokensClaimed) {

  }
}
