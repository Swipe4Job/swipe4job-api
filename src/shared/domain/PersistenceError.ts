import { ApplicationError } from './ApplicationError/ApplicationError';
import { ErrorCode } from './ApplicationError/ErrorCode';

/**
 * This error should be thrown when an error occurred interacting with a persistence
 * service.
 * - DB
 * - File storage
 * - FileSystem
 * - Etc.
 */
export class PersistenceError extends ApplicationError {
  readonly errorCode: ErrorCode = ErrorCode.INTERNAL_ERROR;
  constructor(
    message = 'Error interacting with persistence system',
    public readonly showStack = false,
  ) {
    super(message);
  }
}
