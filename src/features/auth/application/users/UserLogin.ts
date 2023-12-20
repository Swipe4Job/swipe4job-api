import { Injectable } from '@nestjs/common';
import { UserContextService } from '../../../users/domain/UserContextService';
import {
  UserAuthToken,
  UserAuthTokenPayload,
} from '../../domain/users/UserAuthToken';
import { pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import { ApplicationError } from '../../../../shared/domain/ApplicationError/ApplicationError';
import { UserAuthTokensRepository } from '../../domain/UserAuthTokensRepository';
import { JWTService } from '../../domain/JWTService';

@Injectable()
export class UserLogin {
  constructor(
    private userContextService: UserContextService,
    private userAuthTokenRepository: UserAuthTokensRepository,
    private jwtService: JWTService,
  ) {}

  async web2(
    user: string,
    password: string,
  ): Promise<
    Either.Either<
      ApplicationError,
      Promise<{ refresh: string; access: string }>
    >
  > {
    return pipe(
      await this.userContextService.validCredentials(user, password),
      Either.map(async (user) => {
        const authTokenData: UserAuthTokenPayload = {
          userID: user.id.value,
          walletAddress: user.walletAddress?.value || '',
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
      }),
    );
  }
  web3() {}
}
