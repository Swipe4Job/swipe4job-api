import { Injectable } from '@nestjs/common';
import { UserContextService } from '../../../users/domain/UserContextService';
import { UserAuthSessionService } from './UserAuthSessionService';

@Injectable()
export class UserLogin {
  constructor(
    private userContextService: UserContextService,
    private authSessionService: UserAuthSessionService,
  ) {}

  async web2(user: string, password: string): Promise<{ access: string }> {
    const verifiedUser = await this.userContextService.validCredentials(
      user,
      password,
    );
    return this.authSessionService.createSession(verifiedUser);
  }
}
