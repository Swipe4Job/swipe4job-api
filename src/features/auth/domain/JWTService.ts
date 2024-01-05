import { Injectable } from '@nestjs/common';
import { AuthToken, AuthTokenPayload } from './AuthToken';
import { errors, jwtVerify } from 'jose';
import { EnvironmentService } from '../../../shared/infrastructure/services/environment/environment.service';
import { AuthTokenExpired } from './AuthTokenExpired';
import { InvalidToken } from './InvalidToken';
import { ApplicationLogger } from '../../../shared/infrastructure/services/application-logger/application-logger';

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

  async verify(jwt: string): Promise<AuthTokenPayload<unknown>> {
    try {
      // TODO add more edge cases
      const result = await jwtVerify<AuthTokenPayload<unknown>>(
        jwt,
        this.jwtSecret,
      );
      return result.payload;
    } catch (err) {
      if (err instanceof errors.JWTExpired) {
        throw new AuthTokenExpired();
      }

      this.logger.debug(err);
      throw new InvalidToken();
    }
  }
}
