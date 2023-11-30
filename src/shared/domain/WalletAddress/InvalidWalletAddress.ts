import { ApplicationError } from '../ApplicationError/ApplicationError';
import { ErrorCode } from '../ApplicationError/ErrorCode';

export class InvalidWalletAddress extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INVALID_ARGUMENT;

  constructor(
    message = 'Invalid wallet address',
    public readonly showStack = false,
  ) {
    super(message);
  }
}
