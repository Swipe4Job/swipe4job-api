import {UserCriteria} from "../UserRepository/UserCriteria";
import {UserId} from "./UserId";
import {Field, Filter, FilterGroup, Filters, Operand, Operator, Operators, Orders} from "@zertifier/criteria";

export class ByUserID extends UserCriteria {
    constructor(userId: UserId) {
        super({
                filters: new Filters([FilterGroup.create([new Filter(
                    new Field('id'),
                    Operator.from(Operators.EQUAL),
                    new Operand(userId.value)
                )])]),
                orders: Orders.EMPTY()
            },
        );
    }
}