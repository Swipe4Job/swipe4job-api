import { Injectable } from '@nestjs/common';
import { EventBus } from '../../../shared/infrastructure/services/event-bus/event-bus.service';
import { SensorId } from '../../sensors/domain/SensorId';
import { TransactionRepository } from '../domain/TransactionRepository';
import { TransactionCriteria } from '../domain/TransactionCriteria';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';
import { TransactionState } from '../domain/TransactionState';
import { PaymentService } from '../infrastructure/services/payment/payment.service';

@Injectable()
export class ClaimTokens {
  constructor(
    private eventBus: EventBus,
    private transactionRepository: TransactionRepository,
    private paymentService: PaymentService, // TODO implement sensor repository
  ) {}

  public async run(sensorId: SensorId) {
    const transactions = await this.transactionRepository.find(
      new TransactionCriteria({
        filters: Filters.create([
          FilterGroup.create([
            Filter.create('sensor_id', Operators.EQUAL, sensorId.value),
            Filter.create(
              'state',
              Operators.NOT_EQUAL,
              TransactionState.CLAIMED(),
            ),
          ]),
        ]),
        orders: Orders.EMPTY(),
      }),
    );

    const totalTokens = transactions
      .map((t) => t.tokens)
      .reduce((accumulator, current) => accumulator + current);
    this.paymentService.makePayment();
  }
}
