import { Injectable } from '@nestjs/common';
import { EventBus } from '../../../shared/infrastructure/services/event-bus/event-bus.service';
import { TransactionRepository } from '../domain/TransactionRepository/TransactionRepository';
import { TransactionCriteria } from '../domain/TransactionRepository/TransactionCriteria';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';
import { TransactionState } from '../domain/TransactionState';
import { PaymentService } from '../infrastructure/services/payment/payment.service';
import { PrismaProvider } from '../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { WalletAddress } from '../../../shared/domain/WalletAddress/WalletAddress';
import { UserId } from '../../users/domain/UserID/UserId';
import { NothingToClaim } from '../domain/NothingToClaim';
import { SensorRepository } from '../../sensors/domain/SensorRepository';
import { BySensorLegacyId } from '../../sensors/domain/BySensorLegacyId';
import { SensorLegacyId } from '../../sensors/domain/SensorLegacyId';
import { ApplicationLogger } from '../../../shared/infrastructure/services/application-logger/application-logger';

@Injectable()
export class ClaimTokens {
  constructor(
    private logger: ApplicationLogger,
    private eventBus: EventBus,
    private transactionRepository: TransactionRepository,
    private paymentService: PaymentService,
    private prisma: PrismaProvider, // TODO implement sensor repository
    private sensorRepository: SensorRepository,
  ) {}

  public async run(sensorId: number, _userId: string) {
    const [sensor] = await this.sensorRepository.find(
      new BySensorLegacyId(new SensorLegacyId(sensorId)),
    );

    this.logger.debug(sensor.serialize());

    const userId = new UserId(_userId);
    const transactions = await this.transactionRepository.find(
      new TransactionCriteria({
        filters: Filters.create([
          FilterGroup.create([
            Filter.create('sensor_id', Operators.EQUAL, sensor.id.value),
            Filter.create(
              'state',
              Operators.NOT_EQUAL,
              TransactionState.CLAIMED().value,
            ),
          ]),
        ]),
        orders: Orders.EMPTY(),
      }),
    );

    if (transactions.length === 0) {
      this.logger.debug(transactions);
      throw new NothingToClaim();
    }

    const user = await this.prisma.users.findFirst({
      where: {
        uuid: userId.value,
        sensors: {
          some: {
            id: sensorId,
          },
        },
      },
    });
    if (!user) {
      throw Error();
    }

    const totalTokens = transactions
      .map((t) => t.tokens)
      .reduce((accumulator, current) => accumulator + current);

    for (const transaction of transactions) {
      transaction.withState(TransactionState.PENDING());
      await this.transactionRepository.save(transaction);
    }

    await this.paymentService.makePayment(user.wallet_address, totalTokens);

    for (const transaction of transactions) {
      transaction
        .withState(TransactionState.CLAIMED())
        .withDestinationWallet(new WalletAddress(user.wallet_address));
      await this.transactionRepository.save(transaction);
    }
  }
}
