import { Injectable } from '@nestjs/common';
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
    const token = UserAuthToken.from(result);
    const users = await this.userContextService.searchUsers(
      new ByUserID(new UserId(token.payload.data.userID)),
    );
    if (!users) {
      throw new UserNotFound(
        `User with id ${token.payload.data.userID} not found`,
      );
    }

    const accessToken = UserAuthToken.createAccessToken(token.payload.data);
    return await this.jwtService.sign(accessToken);
  }
}
