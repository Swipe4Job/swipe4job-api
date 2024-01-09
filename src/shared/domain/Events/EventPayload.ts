import { EventId } from './EventId';

export interface EventPayload<T> {
  id: EventId;
  time: Date;
  data: T;
}
