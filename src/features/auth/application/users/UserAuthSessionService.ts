import { Injectable } from '@nestjs/common';
import { User } from '../../../users/domain/User';
import {
  UserAuthToken,
  UserAuthTokenPayload,
} from '../../domain/users/UserAuthToken';
import { UserAuthTokensRepository } from '../../domain/users/UserAuthTokensRepository';
import { JWTService } from '../../domain/JWTService';
import { AuthTokenExpired } from '../../domain/AuthTokenExpired';
import { ByUserAuthTokenId } from '../../domain/AuthTokenId/ByUserAuthTokenId';

@Injectable()
export class UserAuthSessionService {
  constructor(
    private userAuthTokenRepository: UserAuthTokensRepository,
    private jwtService: JWTService,
  ) {}

  public async createSession(user: User): Promise<{ access: string }> {
    const authTokenData: UserAuthTokenPayload = {
      userID: user.id.value,
      role: user.role.value,
    };
    const access = UserAuthToken.createAccessToken(authTokenData);

    await this.userAuthTokenRepository.save(access);
    const signedAccessToken = await this.jwtService.sign(access);

    return {
      access: signedAccessToken,
    };
  }

  public async closeSession(jwt: string): Promise<void> {
    try {
      const payload = await this.jwtService.verify(jwt);
      const token = UserAuthToken.from(payload);
      await this.userAuthTokenRepository.delete(
        new ByUserAuthTokenId(token.id),
      );
    } catch (err) {
      if (err instanceof AuthTokenExpired) {
        // TODO emit event token expired
        return;
      }

      throw err;
    }
  }
}
