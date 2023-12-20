import { Module } from '@nestjs/common';
import { JWTService } from '../domain/JWTService';
import { UserLogin } from '../application/users/UserLogin';
import { AuthUsersController } from './users/controllers/auth-users.controller';
import { UserServicesModule } from '../../users/infrastructure/services/user-services.module';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';
import { UserLogout } from '../application/users/UserLogout';
import { UserRefresh } from '../application/users/UserRefresh';
import { PrismaUserAuthTokenRepository } from './users/repositories/prisma-user-auth-token-repository';
import { UserAuthTokensRepository } from '../domain/UserAuthTokensRepository';
import { RootController } from './root/root.controller';
import { VerifyAuthToken } from '../application/VerifyAuthToken';

@Module({
  imports: [SharedProvidersModule, UserServicesModule],
  providers: [
    JWTService,
    UserLogin,
    UserLogout,
    UserRefresh,
    VerifyAuthToken,
    PrismaUserAuthTokenRepository,
    {
      provide: UserAuthTokensRepository,
      useClass: PrismaUserAuthTokenRepository,
    },
  ],
  controllers: [AuthUsersController, RootController],
})
export class AuthModule {}
