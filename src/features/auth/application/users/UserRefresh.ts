import { Injectable } from '@nestjs/common';
import { pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import { AuthTokenExpired } from '../../domain/AuthTokenExpired';
import { UserAuthToken } from '../../domain/users/UserAuthToken';
import { JWTService } from '../../domain/JWTService';
import { UserContextService } from '../../../users/domain/UserContextService';
import { ByUserID } from '../../../users/domain/UserID/ByUserID';
import { UserId } from '../../../users/domain/UserID/UserId';
import { UserNotFound } from '../../../users/domain/UserRepository/UserNotFound';

@Injectable()
export class UserRefresh {
  constructor(
    private jwtService: JWTService,
    private userContextService: UserContextService,
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
    const users = await this.userContextService.searchUsers(
      new ByUserID(new UserId(token.payload.data.id)),
    );
    if (!users) {
      throw new UserNotFound(`User with id ${token.payload.data.id} not found`);
    }

    const accessToken = UserAuthToken.createAccessToken(token.payload.data);
    return await this.jwtService.sign(accessToken);
  }
}
