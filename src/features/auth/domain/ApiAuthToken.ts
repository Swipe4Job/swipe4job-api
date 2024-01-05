import { AuthToken, AuthTokenPayload } from './AuthToken';
import { SignJWT } from 'jose';
import { InvalidTokenPayload } from './InvalidTokenPayload';
import { UnexpectedError } from '../../../shared/domain/ApplicationError/UnexpectedError';
import { AuthTokenId } from './AuthTokenId/AuthTokenId';

export type ApiAuthTokenPayload = {
  name: string;
};

const examplePayload: ApiAuthTokenPayload = {
  name: '',
};

export class ApiAuthToken extends AuthToken<ApiAuthTokenPayload> {
  public static readonly TOKEN_TYPE = 'auth.api';
  payload: AuthTokenPayload<ApiAuthTokenPayload>;

  constructor(data: ApiAuthTokenPayload) {
    super();
    this.payload = { data, type: this.type, kind: 'api' };
  }

  prepareSignature(): SignJWT {
    return new SignJWT(this.payload)
      .setJti(this.id.value)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt();
  }

  type: string = ApiAuthToken.TOKEN_TYPE;

  private static isValidData(value: unknown): value is ApiAuthTokenPayload {
    const keys: (keyof ApiAuthTokenPayload)[] = Object.keys(
      examplePayload,
    ) as (keyof ApiAuthTokenPayload)[];
    const valueKeys = Object.keys(value as any);
    for (const key of keys) {
      if (!valueKeys.includes(key)) {
        return false;
      }
    }

    return true;
  }

  public static from(payload: AuthTokenPayload<unknown>): ApiAuthToken {
    if (payload.type !== ApiAuthToken.TOKEN_TYPE) {
      throw new InvalidTokenPayload(
        'Invalid api auth token payload. Mismatched type',
      );
    }

    if (!payload.jti) {
      throw new UnexpectedError('JTI not defined');
    }

    if (!ApiAuthToken.isValidData(payload.data)) {
      throw new InvalidTokenPayload(
        'Invalid api auth token payload. Invalid data',
      );
    }

    const token = new ApiAuthToken(payload.data);
    token.withId(new AuthTokenId(payload.jti));

    return token;
  }
}
