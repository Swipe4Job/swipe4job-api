import { ApplicationError } from './ApplicationError';
import { ErrorCode } from './ErrorCode';

export class BadRequestError extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.BAD_REQUEST;

  constructor(message = 'BadRequest error', readonly showStack = true) {
    super(message);
  }
}
