import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedProvidersModule } from '../shared/infrastructure/services/shared-providers.module';
import { TransactionsModule } from '../features/transactions/infrastructure/transactions.module';
import { RequestLoggerMiddleware } from './request-logger.middleware';
import { UsersControllersModule } from '../features/users/infrastructure/controllers/users-controllers.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from '../features/auth/infrastructure/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  providers: [RequestLoggerMiddleware],
  imports: [
    EventEmitterModule.forRoot(),
    SharedProvidersModule,
    TransactionsModule,
    UsersControllersModule,
    AuthModule,
    RouterModule.register([
      {
        path: '/auth',
        module: AuthModule,
      },
    ]),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
