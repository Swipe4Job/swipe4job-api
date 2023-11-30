import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApplicationLogger } from '../shared/infrastructure/services/application-logger/application-logger';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private logger: ApplicationLogger) {}
  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl: url } = request;

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(`${method} ${url} ${statusCode} - ${ip}`);
    });

    next();
  }
}
