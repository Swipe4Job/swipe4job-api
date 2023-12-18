import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApplicationLogger } from '../shared/infrastructure/services/application-logger/application-logger';
import { Response } from 'express';
import { HttpResponse } from '../shared/infrastructure/HttpResponse';

@Catch()
export class HttpAllErrorsFilter<T> implements ExceptionFilter {
  constructor(private logger: ApplicationLogger) {}
  catch(error: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error instanceof Error) {
      this.logger.error(error.stack);
    } else {
      this.logger.error(error);
    }

    if (error instanceof HttpException) {
      return response
        .status(error.getStatus())
        .json(HttpResponse.failure(error.message).serialize());
    }

    response
      .status(500)
      .json(HttpResponse.failure('Internal error').serialize());
  }
}
