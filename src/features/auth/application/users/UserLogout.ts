import { Injectable } from '@nestjs/common';
import { JWTService } from '../../domain/JWTService';
import { pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import { UserAuthToken } from '../../domain/users/UserAuthToken';
import { ApplicationLogger } from '../../../../shared/infrastructure/services/application-logger/application-logger';
import { UserAuthTokensRepository } from '../../domain/UserAuthTokensRepository';
import { ByUserAuthTokenId } from '../../domain/AuthTokenId/ByUserAuthTokenId';

@Injectable()
export class UserLogout {
  constructor(
    private jwtService: JWTService,
    private userAuthTokenRepository: UserAuthTokensRepository,
  ) {}
  public async run(jwt: string) {
    const result = await this.jwtService.decode(jwt);
    const token = pipe(
      result,
      Either.match(
        (err) => {
          throw err;
        },
        (token) => UserAuthToken.from(token),
      ),
    );

    await this.userAuthTokenRepository.delete(new ByUserAuthTokenId(token.id));
  }
}
