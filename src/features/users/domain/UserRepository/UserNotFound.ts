import { ApplicationError } from "../../../../shared/domain/ApplicationError/ApplicationError";
import { ErrorCode } from "../../../../shared/domain/ApplicationError/ErrorCode";

export class UserNotFound extends ApplicationError {
    readonly errorCode: ErrorCode = ErrorCode.INTERNAL_ERROR;
    readonly showStack: boolean = false;

    constructor(message = 'User not found') {
        super(message);
    }
}