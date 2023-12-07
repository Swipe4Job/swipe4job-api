import { ApplicationError } from '../../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../../shared/domain/ApplicationError/ErrorCode';

export class InvalidPhoneNumberPrefix extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INVALID_ARGUMENT;
  readonly showStack: boolean = false;

  constructor(message = 'Invalid phone number prefix') {
    super(message);
  }
}
