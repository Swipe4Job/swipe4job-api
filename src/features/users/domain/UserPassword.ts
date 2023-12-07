import {StringValueObject} from "../../../shared/domain/ValueObject/StringValueObject";
import bcrypt from 'bcrypt';
import {InvalidArgument} from "../../../shared/domain/InvalidArgument";

export class UserPassword extends StringValueObject {
    protected constructor(value: string) {
        super(value);
    }

    public static async create(value: string) {
        const hash = await bcrypt.hash(value, 14);
        return new UserPassword(hash);
    }

    /**
     * Verifies that provided has is a valid hash and returns a new Password with that hash
     * @param hash
     */
    public static from(hash: string) {
        const hashRegex = /^\$2b\$\d{2}\$.{53}$/;
        const match = hashRegex.test(hash);
        if (!match) {
            throw new InvalidArgument('Invalid password hash');
        }

        return new UserPassword(hash);
    }

    /**
     * Check if a pain text password match with this encrypted password
     * @param value
     */
    async match(value: string): Promise<boolean> {
        return bcrypt.compare(value, this.value);
    }
}