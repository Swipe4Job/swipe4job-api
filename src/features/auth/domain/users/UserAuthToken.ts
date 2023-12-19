import { AuthToken, AuthTokenKind, AuthTokenPayload } from '../AuthToken';
import { SignJWT } from 'jose';
import { InvalidTokenPayload } from '../InvalidTokenPayload';
import moment from 'moment';
import { AuthTokenId } from '../AuthTokenId/AuthTokenId';

export type UserAuthTokenPayload = {
  walletAddress: string;
};

export class UserAuthToken extends AuthToken<UserAuthTokenPayload> {
  public static readonly TOKEN_TYPE = 'auth.user';
  payload: AuthTokenPayload<UserAuthTokenPayload>;
  type: string = UserAuthToken.TOKEN_TYPE;
  private _expirationDate: Date;

  override withId(id: AuthTokenId): UserAuthToken {
    this._id = id;
    return this;
  }

  constructor(data: UserAuthTokenPayload, kind: AuthTokenKind) {
    super();
    this.payload = { data, type: this.type, kind };
    this._expirationDate = moment().add(6, 'hours').toDate();
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
      .setExpirationTime(this.expirationDate);
  }

  public get expirationDate(): Date {
    return this._expirationDate;
  }

  withExpirationDate(expirationDate: Date): UserAuthToken {
    this._expirationDate = expirationDate;
    return this;
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

    const token = new UserAuthToken(payload.data, payload.kind);
    if (payload.exp) {
      token.withExpirationDate(new Date(payload.exp));
    }

    return token;
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