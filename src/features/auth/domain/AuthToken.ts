import { JWTPayload, SignJWT } from 'jose';

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
  abstract type: string;
  abstract payload: AuthTokenPayload<T>;

  /**
   * Returns a SignJWT with all properties established.
   * It only needs to be signed with the corresponding token secret
   */
  public abstract prepareSignature(): SignJWT;
}
