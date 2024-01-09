import { Injectable } from '@nestjs/common';
import { ApplicationEvent } from '../../../domain/Events/ApplicationEvent';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventBus {
  constructor(private eventEmitter: EventEmitter2) {}
  public emit(event: ApplicationEvent<any>) {
    this.eventEmitter.emit(event.name, event);
  }
}
