import { ApplicationError } from './ApplicationError/ApplicationError';
import { ErrorCode } from './ApplicationError/ErrorCode';

export class InvalidArgument extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INVALID_ARGUMENT;
  readonly showStack: boolean;

  constructor(message = 'Invalid argument', showStack = false) {
    super(message);
    this.showStack = showStack;
  }
}
