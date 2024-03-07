import { ApplicationError } from './ApplicationError';
import { ErrorCode } from './ErrorCode';

export class ForbiddenError extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.FORBIDDEN;

  constructor(message = 'Forbidden error', readonly showStack = true) {
    super(message);
  }
}
