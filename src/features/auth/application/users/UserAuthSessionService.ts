import { Injectable } from '@nestjs/common';
import { User } from '../../../users/domain/User';
import {
  UserAuthToken,
  UserAuthTokenPayload,
} from '../../domain/users/UserAuthToken';
import { UserAuthTokensRepository } from '../../domain/users/UserAuthTokensRepository';
import { JWTService } from '../../domain/JWTService';

@Injectable()
export class UserAuthSessionService {
  constructor(
    private userAuthTokenRepository: UserAuthTokensRepository,
    private jwtService: JWTService,
  ) {}

  public async createSession(
    user: User,
  ): Promise<{ refresh: string; access: string }> {
    const authTokenData: UserAuthTokenPayload = {
      userID: user.id.value,
      walletAddress: user.walletAddress?.value || '',
      role: user.role.value,
    };
    const refresh = UserAuthToken.createRefreshToken(authTokenData);
    const access = UserAuthToken.createAccessToken(authTokenData);

    await this.userAuthTokenRepository.save(refresh);
    const signedRefreshToken = await this.jwtService.sign(refresh);
    const signedAccessToken = await this.jwtService.sign(access);

    return {
      refresh: signedRefreshToken,
      access: signedAccessToken,
    };
  }

  public closeSession(refreshToken: string): Promise<void> {

  }
}
