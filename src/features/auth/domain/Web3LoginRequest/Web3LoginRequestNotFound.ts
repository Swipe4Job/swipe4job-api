import { ApplicationError } from '../../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../../shared/domain/ApplicationError/ErrorCode';

export class Web3LoginRequestNotFound extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INTERNAL_ERROR;

  constructor(
    message = 'Web3 login request not found',
    readonly showStack = false,
  ) {
    super(message);
  }
}
