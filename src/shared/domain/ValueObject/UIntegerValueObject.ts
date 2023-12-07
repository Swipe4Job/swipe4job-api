import {ValueObject} from "./ValueObject";
import {InvalidArgument} from "../InvalidArgument";

export class UIntegerValueObject extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        if (typeof (value as any) !== "number") {
            throw new InvalidArgument('Provided value must a be number');
        }

        if (Math.floor(value) !== value) {
            throw new InvalidArgument('Provided value must be an integer');
        }

        if (value < 0) {
            throw new InvalidArgument('Provided value must be an unsigned integer');
        }
    }
}