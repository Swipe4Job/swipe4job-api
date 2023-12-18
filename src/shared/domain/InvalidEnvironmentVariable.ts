import { ApplicationError } from './ApplicationError/ApplicationError';
import { ErrorCode } from './ApplicationError/ErrorCode';

export class InvalidEnvironmentVariable extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INVALID_ARGUMENT;
  readonly showStack: boolean;

  constructor(message = 'Invalid environment variable', showStack = false) {
    super(message);
    this.showStack = showStack;
  }
}
