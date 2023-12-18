import { ApplicationError } from './ApplicationError/ApplicationError';
import { ErrorCode } from './ApplicationError/ErrorCode';

export class MissingEnvironmentVariable extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INTERNAL_ERROR;
  readonly showStack: boolean;

  constructor(message = 'Missing environment variable', showStack = false) {
    super(message);
    this.showStack = showStack;
  }
}
