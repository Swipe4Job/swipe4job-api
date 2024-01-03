import { Injectable } from '@nestjs/common';
import { UserContextService } from '../../../users/domain/UserContextService';
import { pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import { ApplicationError } from '../../../../shared/domain/ApplicationError/ApplicationError';
import { JWTService } from '../../domain/JWTService';
import { UserAuthSessionService } from './UserAuthSessionService';

@Injectable()
export class UserLogin {
  constructor(
    private userContextService: UserContextService,
    private authSessionService: UserAuthSessionService,
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
      Either.map(this.authSessionService.createSession),
    );
  }
  web3() {}
}
