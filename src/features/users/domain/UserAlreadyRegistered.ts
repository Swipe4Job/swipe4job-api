import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

export class UserAlreadyRegistered extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.FORBIDDEN;
  readonly showStack: boolean;

  constructor(message = 'User already registered', showStack = false) {
    super(message);
    this.showStack = showStack;
  }
}
