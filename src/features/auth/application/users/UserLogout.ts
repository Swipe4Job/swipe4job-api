import { Injectable } from '@nestjs/common';
import { UserAuthSessionService } from './UserAuthSessionService';

@Injectable()
export class UserLogout {
  constructor(private userAuthSessionService: UserAuthSessionService) {}

  public async run(jwt: string) {
    await this.userAuthSessionService.closeSession(jwt);
    // TODO emit event of closed session
  }
}
