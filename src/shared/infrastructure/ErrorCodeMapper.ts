import { ErrorCode } from '../domain/ApplicationError/ErrorCode';

export class ErrorCodeMapper {
  public static toHttpStatusCode(errorCode: ErrorCode) {
    const mapping: { [code: number]: number } = {
      [ErrorCode.INTERNAL_ERROR]: 500,
      [ErrorCode.FORBIDDEN]: 403,
      [ErrorCode.UNAUTHORIZED]: 401,
      [ErrorCode.INVALID_ARGUMENT]: 400,
      [ErrorCode.BAD_REQUEST]: 400,
      [ErrorCode.AUTH_TOKEN_EXPIRED]: 402,
    };

    return mapping[errorCode];
  }
}
