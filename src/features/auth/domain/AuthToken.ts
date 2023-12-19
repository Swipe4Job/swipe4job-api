import { JWTPayload, SignJWT } from 'jose';
import { AuthTokenId } from './AuthTokenId/AuthTokenId';

export type AuthTokenKind = 'access' | 'refresh';

export interface AuthTokenPayload<T> extends JWTPayload {
  readonly kind: AuthTokenKind;
  readonly type: string;
  readonly data: T;
}

/**
 * Auth token is a base class that determines what an authentication
 * token should have. Note that an authentication token only contains data
 */
export abstract class AuthToken<T> {
  protected _id: AuthTokenId;
  abstract type: string;
  abstract payload: AuthTokenPayload<T>;

  protected constructor() {
    this._id = AuthTokenId.random();
  }

  withId(id: AuthTokenId): AuthToken<T> {
    this._id = id;
    return this;
  }

  public get id(): AuthTokenId {
    return this._id;
  }

  /**
   * Returns a SignJWT with all properties established.
   * It only needs to be signed with the corresponding token secret
   */
  public abstract prepareSignature(): SignJWT;
}
