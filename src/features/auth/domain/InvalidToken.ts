import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

/**
 * Invalid token should be thrown after verifying a JWT.
 *
 * Do not confuse with {@link InvalidTokenPayload}.
 *
 * Token verification is divided in two parts. Signature and claims verification,
 * this error is for this part. And payload verification {@link InvalidTokenPayload} is for that part.
 */
export class InvalidToken extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.BAD_REQUEST;
  readonly showStack: boolean;

  constructor(message = 'Invalid token', showStack = false) {
    super(message);
    this.showStack = showStack;
  }
}
