import { ApplicationError } from './ApplicationError';
import { ErrorCode } from './ErrorCode';

export class UnexpectedError extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INTERNAL_ERROR;

  constructor(message = 'Unexpected error', readonly showStack = true) {
    super(message);
  }
}
