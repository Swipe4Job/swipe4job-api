import { Module } from '@nestjs/common';
import { UserRepository } from '../domain/UserRepository/UserRepository';
import { PrismaUserRepository } from './PrismaUserRepository';
import { UsersController } from './users-controller/users.controller';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';
import { UserRegister } from '../application/UserRegister';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    UserRegister,
  ],
  exports: [UserRepository],
  controllers: [UsersController],
  imports: [SharedProvidersModule],
})
export class UsersModule {}
