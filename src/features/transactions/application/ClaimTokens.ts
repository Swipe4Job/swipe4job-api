import { Injectable } from '@nestjs/common';
import { EventBus } from '../../../shared/infrastructure/services/event-bus/event-bus.service';
import { SensorId } from '../../sensors/domain/SensorId';
import { TransactionRepository } from '../domain/TransactionRepository';

@Injectable()
export class ClaimTokens {
  constructor(
    private eventBus: EventBus,
    private transactionRepository: TransactionRepository
  ) {
  }

  public async run(sensorId: SensorId) {


  }
}
