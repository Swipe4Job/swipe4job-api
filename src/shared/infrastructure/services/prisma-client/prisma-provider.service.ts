import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ApplicationLogger } from '../application-logger/application-logger';
import { PersistenceError } from '../../../domain/PersistenceError';

@Injectable()
export class PrismaProvider extends PrismaClient implements OnModuleInit {
  private logContext = 'Prisma provider';
  constructor(private logger: ApplicationLogger) {
    super();
  }
  async onModuleInit(): Promise<any> {
    try {
      await this.$connect();
      this.logger.log('Connected to database successfully', this.logContext);
    } catch (err) {
      this.logger.error(err, this.logContext);
      throw new PersistenceError(
        'Cannot connect to database using prisma client',
      );
    }
  }
}
