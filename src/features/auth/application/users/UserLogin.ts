import { Injectable } from '@nestjs/common';
import { ApplicationLogger } from '../../../../shared/infrastructure/services/application-logger/application-logger';
import { UserContextService } from '../../../users/domain/UserContextService';
import {
  UserAuthToken,
  UserAuthTokenPayload,
} from '../../domain/users/UserAuthToken';
import { pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import { ApplicationError } from '../../../../shared/domain/ApplicationError/ApplicationError';

@Injectable()
export class UserLogin {
  constructor(private userContextService: UserContextService) {}

  async web2(
    user: string,
    password: string,
  ): Promise<
    Either.Either<
      ApplicationError,
      { refresh: UserAuthToken; access: UserAuthToken }
    >
  > {
    return pipe(
      await this.userContextService.validCredentials(user, password),
      Either.map((user) => {
        const authTokenData: UserAuthTokenPayload = { id: user.id.value };
        const refresh = UserAuthToken.createRefreshToken(authTokenData);
        const access = UserAuthToken.createAccessToken(authTokenData);
        return {
          refresh,
          access,
        };
      }),
    );
  }
  web3() {}
}
