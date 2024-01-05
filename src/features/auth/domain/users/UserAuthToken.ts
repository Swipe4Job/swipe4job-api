import { AuthToken, AuthTokenKind, AuthTokenPayload } from '../AuthToken';
import { SignJWT } from 'jose';
import { InvalidTokenPayload } from '../InvalidTokenPayload';
import moment from 'moment';
import { AuthTokenId } from '../AuthTokenId/AuthTokenId';
import { UnexpectedError } from '../../../../shared/domain/ApplicationError/UnexpectedError';
import { ApiAuthTokenPayload } from '../ApiAuthToken';

export type UserAuthTokenPayload = {
  userID: string;
  walletAddress: string;
  role: string;
};

const examplePayload: UserAuthTokenPayload = {
  userID: '',
  walletAddress: '',
  role: '',
};

export class UserAuthToken extends AuthToken<UserAuthTokenPayload> {
  public static readonly TOKEN_TYPE = 'auth.user';
  payload: AuthTokenPayload<UserAuthTokenPayload>;
  type: string = UserAuthToken.TOKEN_TYPE;

  protected constructor(data: UserAuthTokenPayload, kind: AuthTokenKind) {
    super();
    this.payload = { data, type: this.type, kind };
  }

  private _expirationDate!: Date;

  public get expirationDate(): Date {
    return this._expirationDate;
  }

  public static createRefreshToken(data: UserAuthTokenPayload) {
    const expirationDate = moment().add(6, 'hours').toDate();
    return new UserAuthToken(data, 'refresh').withExpirationDate(
      expirationDate,
    );
  }

  public static createAccessToken(data: UserAuthTokenPayload) {
    const expirationDate = moment().add(2, 'hours').toDate();
    return new UserAuthToken(data, 'access').withExpirationDate(expirationDate);
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
    if (!payload.jti) {
      throw new UnexpectedError('JTI not defined');
    }

    token.withId(new AuthTokenId(payload.jti));

    return token;
  }

  private static isValidData(value: unknown): value is UserAuthTokenPayload {
    // TODO add more keys
    const keys: (keyof UserAuthTokenPayload)[] = Object.keys(
      examplePayload,
    ) as (keyof UserAuthTokenPayload)[];
    const valueKeys = Object.keys(value as any);
    for (const key of keys) {
      if (!valueKeys.includes(key)) {
        return false;
      }
    }

    return true;
  }

  override withId(id: AuthTokenId): UserAuthToken {
    this._id = id;
    return this;
  }

  prepareSignature(): SignJWT {
    return new SignJWT(this.payload)
      .setJti(this.id.value)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(this.expirationDate);
  }

  withExpirationDate(expirationDate: Date): UserAuthToken {
    this._expirationDate = expirationDate;
    return this;
  }
}
