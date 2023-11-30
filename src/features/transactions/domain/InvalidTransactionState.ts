import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

export class InvalidTransactionState extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INVALID_ARGUMENT;
  constructor(
    message = 'Invalid transaction state',
    public readonly showStack = false,
  ) {
    super(message);
  }
}
