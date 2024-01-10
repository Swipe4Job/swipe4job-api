import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

export class TransactionFailed extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INTERNAL_ERROR;
  constructor(message = 'Transaction failed', readonly showStack = true) {
    super(message);
  }
}
