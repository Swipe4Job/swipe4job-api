import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationLogger extends ConsoleLogger {
  constructor() {
    super('Zertiair V2');
  }
}
