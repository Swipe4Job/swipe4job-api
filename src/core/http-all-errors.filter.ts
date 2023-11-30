import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApplicationLogger } from '../shared/infrastructure/services/application-logger/application-logger';
import { Response } from 'express';
import { HttpResponse } from '../shared/infrastructure/HttpResponse';

@Catch()
export class HttpAllErrorsFilter<T> implements ExceptionFilter {
  constructor(private logger: ApplicationLogger) {}
  catch(error: T, host: ArgumentsHost) {
    this.logger.debug('All errors filter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error instanceof Error) {
      this.logger.error(error.stack);
    } else {
      this.logger.error(error);
    }

    response
      .status(500)
      .json(HttpResponse.failure('Internal error').serialize());
  }
}
