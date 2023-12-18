import { Module } from '@nestjs/common';
import { UsersController } from './users-controller/users.controller';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';
import { UserRegister } from '../../application/UserRegister';
import { UserServicesModule } from '../services/user-services.module';
import { UserRepositoriesModule } from '../repositories/user-repositories.module';

@Module({
  providers: [UserRegister],
  controllers: [UsersController],
  imports: [SharedProvidersModule, UserServicesModule, UserRepositoriesModule],
})
export class UsersControllersModule {}
