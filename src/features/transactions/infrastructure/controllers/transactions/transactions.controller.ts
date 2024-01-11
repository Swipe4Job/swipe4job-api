import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ReqNewTransactionDTO } from './DTOs/NewTransaction/ReqNewTransactionDTO';
import { Transaction } from '../../../domain/Transaction';
import { TransactionId } from '../../../domain/TransactionId';
import { TransactionRepository } from '../../../domain/TransactionRepository/TransactionRepository';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';
import { ClaimTokensRequest } from './DTOs/ClaimTokensRequest';
import { AuthTokenGuard } from '../../../../auth/infrastructure/auth-token/auth-token.guard';
import { InjectAuthToken } from '../../../../auth/infrastructure/auth-token/auth-token.decorator';
import { AuthTokenPayload } from '../../../../auth/domain/AuthToken';
import { PaymentService } from '../../services/payment/payment.service';
import { UserAuthToken } from '../../../../auth/domain/users/UserAuthToken';
import { OnEvent } from '@nestjs/event-emitter';
import { TokensClaimed } from '../../../domain/TokensClaimed';
import { ClaimStarted } from '../../../domain/ClaimStarted';
import { SensorId } from '../../../../sensors/domain/SensorId';
import { ClaimTokens } from '../../../application/ClaimTokens';
import { SensorRepository } from '../../../../sensors/domain/SensorRepository';
import { BySensorId } from '../../../../sensors/domain/BySensorId';
import { SensorLegacyId } from '../../../../sensors/domain/SensorLegacyId';
import { BySensorLegacyId } from '../../../../sensors/domain/BySensorLegacyId';
import { Sensor } from '../../../../sensors/domain/Sensor';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionRepository: TransactionRepository,
    private paymentService: PaymentService,
    private claimTokensAction: ClaimTokens,
    private sensorRepository: SensorRepository,
  ) {}

  @Post('/')
  async newTransaction(@Body() body: ReqNewTransactionDTO) {
    const sensors: Sensor[] = await this.sensorRepository.find(
      new BySensorLegacyId(new SensorLegacyId(body.sensorId)),
    );
    const sensor = sensors[0];

    const transaction = new Transaction(sensor.id, body.tokens);
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
    await this.claimTokensAction.run(
      sensorId,
      userAuthToken.payload.data.userID,
    );
    return HttpResponse.success('Tokens claimed');
  }

  @Post('/mint')
  async mint(@Body() body: any) {
    await this.paymentService.makePayment(body.to, body.amount);

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
  claimStarted(event: ClaimStarted) {}

  @OnEvent(TokensClaimed.NAME)
  tokensClaimed(event: TokensClaimed) {}
}
