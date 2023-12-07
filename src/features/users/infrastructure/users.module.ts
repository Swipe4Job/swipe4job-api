import { Module } from '@nestjs/common';
import { UserRepository } from '../domain/UserRepository/UserRepository';
import { PrismaUserRepository } from './PrismaUserRepository';
import { UsersController } from './users-controller/users.controller';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
  controllers: [UsersController],
  imports: [SharedProvidersModule]
})
export class UsersModule {}
