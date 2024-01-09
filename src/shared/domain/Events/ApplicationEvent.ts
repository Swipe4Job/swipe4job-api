import { EventPayload } from './EventPayload';

export abstract class ApplicationEvent<T> {
  abstract name: string;
  abstract payload: EventPayload<T>;
}
