import {UIntegerValueObject} from "../../../../shared/domain/ValueObject/UIntegerValueObject";
import {InvalidArgument} from "../../../../shared/domain/InvalidArgument";

export class UserId extends UIntegerValueObject {
    constructor(value: number) {
        super(value);
        if (value <= 0) {
            throw new InvalidArgument('Provided value must be a positive integer');
        }
    }
}
