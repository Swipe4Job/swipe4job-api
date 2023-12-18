import { Injectable } from '@nestjs/common';
import { AuthToken, AuthTokenPayload } from './AuthToken';
import Either from 'fp-ts/Either';
import { errors, jwtVerify } from 'jose';
import { EnvironmentService } from '../../../shared/infrastructure/services/environment/environment.service';
import { AuthTokenExpired } from './AuthTokenExpired';
import { InvalidToken } from './InvalidToken';
import { ApplicationLogger } from '../../../shared/infrastructure/services/application-logger/application-logger';

export type JwtError = AuthTokenExpired | InvalidToken;

@Injectable()
export class JWTService {
  constructor(
    private environment: EnvironmentService,
    private logger: ApplicationLogger,
  ) {}

  private _jwtSecret?: Uint8Array;

  private get jwtSecret(): Uint8Array {
    if (!this._jwtSecret) {
      this._jwtSecret = new TextEncoder().encode(
        this.environment.ENV.JWT_SECRET,
      );
    }
    return this._jwtSecret;
  }

  sign<T>(authToken: AuthToken<T>): Promise<string> {
    return authToken.prepareSignature().sign(this.jwtSecret);
  }

  async verify(
    jwt: string,
  ): Promise<Either.Either<JwtError, AuthTokenPayload<unknown>>> {
    try {
      const result = await jwtVerify<AuthTokenPayload<unknown>>(
        jwt,
        this.jwtSecret,
      );
      return Either.right(result.payload);
    } catch (err) {
      if (err instanceof errors.JWTExpired) {
        return Either.left(new AuthTokenExpired());
      }

      this.logger.debug(err);
      return Either.left(new InvalidToken());
    }
  }
}
