import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedProvidersModule } from '../shared/infrastructure/services/shared-providers.module';
import { TransactionsModule } from '../features/transactions/infrastructure/transactions.module';
import { RequestLoggerMiddleware } from './request-logger.middleware';

@Module({
  providers: [RequestLoggerMiddleware],
  imports: [SharedProvidersModule, TransactionsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
