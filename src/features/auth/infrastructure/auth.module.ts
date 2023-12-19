import { Module } from '@nestjs/common';
import { JWTService } from '../domain/JWTService';
import { UserLogin } from '../application/users/UserLogin';
import { AuthUsersController } from './users/auth-users.controller';
import { UserServicesModule } from '../../users/infrastructure/services/user-services.module';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';
import { UserLogout } from '../application/users/UserLogout';
import { UserRefresh } from '../application/users/UserRefresh';
import { PrismaUserAuthTokenRepository } from './repositories/prisma-user-auth-token-repository';

@Module({
  imports: [SharedProvidersModule, UserServicesModule],
  providers: [JWTService, UserLogin, UserLogout, UserRefresh, PrismaUserAuthTokenRepository],
  controllers: [AuthUsersController],
})
export class AuthModule {}
