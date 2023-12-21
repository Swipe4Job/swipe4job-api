import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

export class CityNotFound extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INTERNAL_ERROR;
  constructor(message = 'City not found', readonly showStack = false) {
    super(message);
  }
}
