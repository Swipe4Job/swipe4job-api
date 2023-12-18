import { Module } from '@nestjs/common';
import { JWTService } from '../domain/JWTService';
import { UserLogin } from '../application/users/UserLogin';
import { AuthUsersController } from './users/auth-users.controller';
import { UserServicesModule } from '../../users/infrastructure/services/user-services.module';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';
import { UserLogout } from '../application/users/UserLogout';
import { UserRefresh } from '../application/users/UserRefresh';

@Module({
  imports: [SharedProvidersModule, UserServicesModule],
  providers: [JWTService, UserLogin, UserLogout, UserRefresh],
  controllers: [AuthUsersController],
})
export class AuthModule {}
