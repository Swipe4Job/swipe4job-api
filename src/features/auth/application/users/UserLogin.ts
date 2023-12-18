import { Injectable } from '@nestjs/common';
import { ApplicationLogger } from '../../../../shared/infrastructure/services/application-logger/application-logger';
import { JWTService } from '../../domain/JWTService';
import { UserContextService } from '../../../users/domain/UserContextService';
import { UserAuthToken } from '../../domain/users/UserAuthToken';
import { pipe } from 'fp-ts/function';
import Either from 'fp-ts/Either';
import { ApplicationError } from '../../../../shared/domain/ApplicationError/ApplicationError';

@Injectable()
export class UserLogin {
  constructor(
    private logger: ApplicationLogger,
    private jwtService: JWTService,
    private userContextService: UserContextService,
  ) {}

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
        const authTokenData = { id: user.id.value };
        return {
          refresh: UserAuthToken.createRefreshToken(authTokenData),
          access: UserAuthToken.createAccessToken(authTokenData),
        };
      }),
    );
  }
  web3() {}
}
