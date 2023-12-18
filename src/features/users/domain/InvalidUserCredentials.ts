import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

export class InvalidUserCredentials extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.BAD_REQUEST;

  constructor(
    message = 'Invalid user credentials',
    readonly showStack = false,
  ) {
    super(message);
  }
}
