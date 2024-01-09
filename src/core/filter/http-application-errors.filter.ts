import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError } from '../../shared/domain/ApplicationError/ApplicationError';
import { ApplicationLogger } from '../../shared/infrastructure/services/application-logger/application-logger';
import { HttpResponse } from '../../shared/infrastructure/HttpResponse';
import { ErrorCodeMapper } from '../../shared/infrastructure/ErrorCodeMapper';

@Catch(ApplicationError)
export class HttpApplicationErrorsFilter implements ExceptionFilter {
  constructor(private logger: ApplicationLogger) {}

  catch(error: ApplicationError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error.showStack) {
      this.logger.error(error.stack);
    }

    const statusCode = ErrorCodeMapper.toHttpStatusCode(error.errorCode);
    response
      .status(statusCode)
      .json(HttpResponse.failure(error.message, error.errorCode).serialize());
  }
}
