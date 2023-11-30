import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError } from '../shared/domain/ApplicationError/ApplicationError';
import { ApplicationLogger } from '../shared/infrastructure/services/application-logger/application-logger';
import { HttpResponse } from '../shared/infrastructure/HttpResponse';

@Catch(ApplicationError)
export class HttpApplicationErrorsFilter implements ExceptionFilter {
  constructor(private logger: ApplicationLogger) {}

  catch(error: ApplicationError, host: ArgumentsHost): void {
    this.logger.debug('ApplicationErrorsFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error.showStack) {
      this.logger.error(error.message, error.stack);
    }

    response.status(500).json(HttpResponse.failure(error.message).serialize());
  }
}
