import { ApplicationEvent } from '../../../shared/domain/Events/ApplicationEvent';
import { EventPayload } from '../../../shared/domain/Events/EventPayload';
import { EventId } from '../../../shared/domain/Events/EventId';
import { SensorId } from '../../sensors/domain/SensorId';

export interface ClaimStartedPayload {
  sensorId: SensorId;
}

export class ClaimStarted extends ApplicationEvent<ClaimStartedPayload> {
  public static NAME = 'transactions.claim-started';
  name: string = ClaimStarted.NAME;
  payload: EventPayload<ClaimStartedPayload>;

  constructor(sensorId: SensorId) {
    super();
    this.payload = {
      data: {
        sensorId: sensorId,
      },
      time: new Date(),
      id: EventId.random(),
    };
  }
}
