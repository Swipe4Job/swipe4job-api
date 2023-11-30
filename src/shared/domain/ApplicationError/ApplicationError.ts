import { ErrorCode } from './ErrorCode';

export abstract class ApplicationError extends Error {
  public abstract readonly errorCode: ErrorCode;
  public abstract readonly showStack: boolean;
}
