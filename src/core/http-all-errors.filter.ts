import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApplicationLogger } from '../shared/infrastructure/services/application-logger/application-logger';
import { Response } from 'express';
import { HttpResponse } from '../shared/infrastructure/HttpResponse';
import { ValidationError } from 'class-validator';

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
      const httpResponse = HttpResponse.failure(error.message);
      httpResponse.withData(error.getResponse());
      return response.status(error.getStatus()).json(httpResponse.serialize());
    }

    response
      .status(500)
      .json(HttpResponse.failure('Internal error').serialize());
  }
}
