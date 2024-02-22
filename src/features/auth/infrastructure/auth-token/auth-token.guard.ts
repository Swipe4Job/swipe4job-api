import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthTokenNotProvided } from '../../domain/AuthTokenNotProvided';
import { BadAuthTokenFormat } from '../../domain/BadAuthTokenFormat';
import { JWTService } from '../../domain/JWTService';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(private jwtService: JWTService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
      throw new AuthTokenNotProvided();
    }

    const [bearer, token] = bearerToken.split(' ');
    if (!(bearer && token)) {
      throw new BadAuthTokenFormat(
        "Bad auth token format it must be 'Bearer <token>'",
      );
    }

    if (bearer !== 'Bearer') {
      throw new BadAuthTokenFormat(
        "Bad auth token format it must be 'Bearer <token>'",
      );
    }

    request.authTokenPayload = await this.jwtService.verify(token);
    return true;
  }
}
