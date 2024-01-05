import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

export class BadAuthTokenFormat extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.BAD_REQUEST;

  constructor(message = 'Bad auth token format', readonly showStack = false) {
    super(message);
  }
}
