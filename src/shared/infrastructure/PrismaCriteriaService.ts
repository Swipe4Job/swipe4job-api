import {Filter, Filters, Operators, OrderDirection, Orders} from "@zertifier/criteria";

export class PrismaCriteriaService {
    convertFilters(filters: Filters): any {
        const groups = filters.groups;
        const convertedGroups = groups.map(group => {
            const convertedFilters = group.filters.map(this.convertFilter);
            return {AND: convertedFilters};
        });
        return {OR: convertedGroups};
    }

    convertOrders(orders: Orders): { [field: string]: 'desc' | 'asc' }[] {
        return orders.orders
            .map(order => {
                let rawOrder: { [field: string]: 'desc' | 'asc' } = {};
                rawOrder[order.field.value] = order.direction.equals(OrderDirection.ASC) ? 'asc' : 'desc';
                return rawOrder;
            });
    }

    convertFilter(filter: Filter): any {
        let prismaFilter: any = {};
        let filterValue: any;
        switch (filter.operator.value) {
            case Operators.EQUAL:
                filterValue = {equals: filter.operand.value};
                break;
            case Operators.GREATER:
                filterValue = {gt: filter.operand.value};
                break;
            case Operators.LOWER:
                filterValue = {lt: filter.operand.value};
                break;
            case Operators.GREATER_EQUAL:
                filterValue = {gte: filter.operand.value};
                break;
            case Operators.LOWER_EQUAL:
                filterValue = {lte: filter.operand.value};
                break;
            case Operators.IN:
                filterValue = {in: filter.operand.value};
                break;
            case Operators.LIKE:
                filterValue = {contains: filter.operand.value};
                break;
            case Operators.NOT_EQUAL:
                filterValue = {
                    not: {
                        equals: filter.operand.value,
                    }
                };
                break;
        }

        prismaFilter[filter.field.value] = filterValue;
        return prismaFilter;
    }
}