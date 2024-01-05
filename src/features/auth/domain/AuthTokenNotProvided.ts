import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

export class AuthTokenNotProvided extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.BAD_REQUEST;

  constructor(message = 'Auth token not provided', readonly showStack = false) {
    super(message);
  }
}
