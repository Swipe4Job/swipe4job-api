import { Module } from '@nestjs/common';
import { JWTService } from '../domain/JWTService';
import { UserLogin } from '../application/users/UserLogin';
import { AuthUsersController } from './users/controllers/auth-users.controller';
import { UserServicesModule } from '../../users/infrastructure/services/user-services.module';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';
import { UserLogout } from '../application/users/UserLogout';
import { UserRefresh } from '../application/users/UserRefresh';
import { PrismaUserAuthTokenRepository } from './users/repositories/prisma-user-auth-token-repository';
import { UserAuthTokensRepository } from '../domain/users/UserAuthTokensRepository';
import { RootController } from './root/root.controller';
import { VerifyAuthToken } from '../application/VerifyAuthToken';
import { UserWeb3Login } from '../application/users/UserWeb3Login';
import { PrismaWeb3LoginRequestsRepository } from './users/repositories/prisma-web3-login-requests-repository';
import { Web3LoginRequestsRepository } from '../domain/Web3LoginRequest/Web3LoginRequestsRepository';
import { UserAuthSessionService } from '../application/users/UserAuthSessionService';
import { UserGetSignCode } from '../application/users/UserGetSignCode';
import { AuthTokenGuard } from './auth-token/auth-token.guard';

@Module({
  imports: [SharedProvidersModule, UserServicesModule],
  providers: [
    AuthTokenGuard,
    JWTService,
    UserLogin,
    UserWeb3Login,
    UserLogout,
    UserRefresh,
    VerifyAuthToken,
    UserAuthSessionService,
    UserGetSignCode,
    {
      provide: UserAuthTokensRepository,
      useClass: PrismaUserAuthTokenRepository,
    },
    {
      provide: Web3LoginRequestsRepository,
      useClass: PrismaWeb3LoginRequestsRepository,
    },
  ],
  controllers: [AuthUsersController, RootController],
  exports: [AuthTokenGuard, JWTService],
})
export class AuthModule {}
