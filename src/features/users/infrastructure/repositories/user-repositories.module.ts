import { Module } from '@nestjs/common';
import { UserRepository } from '../../domain/UserRepository/UserRepository';
import { PrismaUserRepository } from './PrismaUserRepository';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
  imports: [SharedProvidersModule],
})
export class UserRepositoriesModule {}
