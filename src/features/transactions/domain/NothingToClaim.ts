import { ApplicationError } from '../../../shared/domain/ApplicationError/ApplicationError';
import { ErrorCode } from '../../../shared/domain/ApplicationError/ErrorCode';

export class NothingToClaim extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.BAD_REQUEST;

  constructor(message = 'Nothing to claim', readonly showStack = false) {
    super(message);
  }
}
