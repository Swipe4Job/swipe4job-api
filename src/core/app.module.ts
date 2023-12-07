import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedProvidersModule } from '../shared/infrastructure/services/shared-providers.module';
import { TransactionsModule } from '../features/transactions/infrastructure/transactions.module';
import { RequestLoggerMiddleware } from './request-logger.middleware';
import { UsersModule } from '../features/users/infrastructure/users.module';

@Module({
  providers: [RequestLoggerMiddleware],
  imports: [SharedProvidersModule, TransactionsModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
