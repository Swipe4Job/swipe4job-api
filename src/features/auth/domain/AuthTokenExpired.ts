import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

export class AuthTokenExpired extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.AUTH_TOKEN_EXPIRED;
  readonly showStack: boolean;

  constructor(message = 'Auth token expired', showStack = false) {
    super(message);
    this.showStack = showStack;
  }
}
