import {Criteria, Limit, Skip} from "@zertifier/criteria";
import {Filters} from "@zertifier/criteria/dist/Filters";
import {Orders} from "@zertifier/criteria/dist/Orders";
import {InvalidFilterField} from "../../../../shared/domain/Criteria/InvalidFilterField";
import {InvalidOrderField} from "../../../../shared/domain/Criteria/InvalidOrderField";

export class UserCriteria extends Criteria {
    private allowedFilterFields = [
        'username',
        'email',
        'walletAddress',
        'phoneNumber',
        'id',
        'role',
    ]
    private allowedOrderFields = [
        'username',
        'email',
        'walletAddress',
        'phoneNumber',
        'id',
        'role',
    ]
    constructor(params: {
        filters: Filters,
        orders: Orders,
        skip?: Skip,
        limit?: Limit
    }) {
        super(params);
        // Validate filters
        const {filters} = params;
        const filterFields = filters.groups.flatMap(group => group.filters.map(filter => filter.field.value));
        for (const field of filterFields) {
            if (!this.allowedFilterFields.includes(field)) {
                throw new InvalidFilterField(`Invalid user filter field. Allowed fields: [${this.allowedFilterFields.join(", ")}]`);
            }
        }

        const {orders} = params;
        const orderFields = orders.orders.flatMap(order => order.field.value);
        for (const field of orderFields) {
            if (!this.allowedOrderFields.includes(field)) {
                throw new InvalidOrderField(`Invalid user order field. Allowed fields: [${this.allowedOrderFields.join(", ")}]`);
            }
        }
    }
}