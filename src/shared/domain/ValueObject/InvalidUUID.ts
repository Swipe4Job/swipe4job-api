import { ApplicationError } from '../ApplicationError/ApplicationError';
import { ErrorCode } from '../ApplicationError/ErrorCode';

export class InvalidUUID extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INVALID_ARGUMENT;
  constructor(message = 'Invalid UUID', public readonly showStack = false) {
    super(message);
  }
}
