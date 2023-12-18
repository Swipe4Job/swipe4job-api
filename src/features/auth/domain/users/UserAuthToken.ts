import { AuthToken, AuthTokenKind, AuthTokenPayload } from '../AuthToken';
import { SignJWT } from 'jose';
import { InvalidTokenPayload } from '../InvalidTokenPayload';

export type UserAuthTokenPayload = {
  id: number;
};

export class UserAuthToken extends AuthToken<UserAuthTokenPayload> {
  public static readonly TOKEN_TYPE = 'auth.user';
  payload: AuthTokenPayload<UserAuthTokenPayload>;
  type: string = UserAuthToken.TOKEN_TYPE;

  constructor(data: UserAuthTokenPayload, kind: AuthTokenKind) {
    super();
    this.payload = { data, type: this.type, kind };
  }

  public static createRefreshToken(data: UserAuthTokenPayload) {
    return new UserAuthToken(data, 'refresh');
  }

  public static createAccessToken(data: UserAuthTokenPayload) {
    return new UserAuthToken(data, 'access');
  }

  prepareSignature(): SignJWT {
    return new SignJWT(this.payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('6h');
  }

  public static from(payload: AuthTokenPayload<unknown>): UserAuthToken {
    if (payload.type !== UserAuthToken.TOKEN_TYPE) {
      throw new InvalidTokenPayload(
        'Invalid user auth token payload. Mismatched type',
      );
    }

    if (!UserAuthToken.isValidData(payload.data)) {
      throw new InvalidTokenPayload(
        'Invalid user auth token payload. Invalid data',
      );
    }

    return new UserAuthToken(payload.data, payload.kind);
  }

  private static isValidData(value: unknown): value is UserAuthTokenPayload {
    const keys = ['id'];
    const valueKeys = Object.keys(value as any);
    for (const key of keys) {
      if (!valueKeys.includes(key)) {
        return false;
      }
    }

    return true;
  }
}
