import { ApplicationError } from '../../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../../shared/domain/ApplicationError/ErrorCode';

export class NoMatchingWeb3LoginRequestFound extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.BAD_REQUEST;

  constructor(
    message = 'No matching web3 login request found',
    readonly showStack = false,
  ) {
    super(message);
  }
}
