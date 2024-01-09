import { ApplicationEvent } from '../../../shared/domain/Events/ApplicationEvent';
import { EventPayload } from '../../../shared/domain/Events/EventPayload';
import { EventId } from '../../../shared/domain/Events/EventId';

export class TokensClaimed extends ApplicationEvent<void> {
  public static NAME = 'transactions.tokens-claimed';
  name: string = TokensClaimed.NAME;
  payload: EventPayload<void>;

  constructor() {
    super();

    this.payload = {
      data: undefined,
      time: new Date(),
      id: EventId.random(),
    };
  }
}
