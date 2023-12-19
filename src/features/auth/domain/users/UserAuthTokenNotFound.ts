import { ApplicationError } from '../../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../../shared/domain/ApplicationError/ErrorCode';

export class UserAuthTokenNotFound extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INTERNAL_ERROR;

  constructor(
    message = 'User auth token not found',
    readonly showStack = false,
  ) {
    super(message);
  }
}
