import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

/**
 * Invalid token payload should be thrown when cannot create a new AuthToken
 * from a token payload.
 *
 * Reasons:
 * - mismatched type
 * - bad data
 * - etc.
 */
export class InvalidTokenPayload extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.BAD_REQUEST;
  readonly showStack: boolean;

  constructor(message = 'Invalid token payload', showStack = false) {
    super(message);
    this.showStack = showStack;
  }
}
