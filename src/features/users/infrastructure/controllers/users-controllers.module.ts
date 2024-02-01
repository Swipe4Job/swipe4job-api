import { Module } from '@nestjs/common';
import { UsersController } from './users-controller/users.controller';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';
import { UserRegister } from '../../application/UserRegister';
import { UserServicesModule } from '../services/user-services.module';
import { UserRepositoriesModule } from '../repositories/user-repositories.module';
import { ListUsers } from '../../application/ListUsers';
import { AuthModule } from '../../../auth/infrastructure/auth.module';

@Module({
  providers: [UserRegister, ListUsers],
  controllers: [UsersController],
  imports: [
    SharedProvidersModule,
    UserServicesModule,
    UserRepositoriesModule,
    AuthModule,
  ],
})
export class UsersControllersModule {}
