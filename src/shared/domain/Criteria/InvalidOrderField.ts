import {ApplicationError} from "../ApplicationError/ApplicationError";
import {ErrorCode} from "../ApplicationError/ErrorCode";

export class InvalidOrderField extends ApplicationError {
    readonly errorCode: ErrorCode = ErrorCode.INVALID_ARGUMENT;
    readonly showStack: boolean = false;
    constructor(message = 'Invalid order field') {
        super(message);
    }
}