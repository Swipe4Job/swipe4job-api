import { Injectable } from '@nestjs/common';
import { EventBus } from '../../../core/in-memory-event-bus/event-bus.service';
import { SensorId } from '../../sensors/domain/SensorId';

@Injectable()
export class ClaimTokens {
  constructor(private eventBus: EventBus) {
  }

  public async run(sensorId: SensorId) {

  }
}
