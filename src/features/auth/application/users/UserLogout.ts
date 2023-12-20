import { Injectable } from '@nestjs/common';
import { JWTService } from '../../domain/JWTService';
import { pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import { UserAuthToken } from '../../domain/users/UserAuthToken';
import { UserAuthTokensRepository } from '../../domain/UserAuthTokensRepository';
import { ByUserAuthTokenId } from '../../domain/AuthTokenId/ByUserAuthTokenId';
import { AuthTokenExpired } from '../../domain/AuthTokenExpired';

@Injectable()
export class UserLogout {
  constructor(
    private jwtService: JWTService,
    private userAuthTokenRepository: UserAuthTokensRepository,
  ) {}

  public async run(jwt: string) {
    const result = await this.jwtService.verify(jwt);
    const token = pipe(
      result,
      Either.match(
        (err) => {
          if (err instanceof AuthTokenExpired) {
            // TODO emit event token expired
          }
          throw err;
        },
        (token) => UserAuthToken.from(token),
      ),
    );

    await this.userAuthTokenRepository.delete(new ByUserAuthTokenId(token.id));
  }
}
