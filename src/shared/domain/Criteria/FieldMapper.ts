import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import {
  Criteria,
  Field,
  Filter,
  FilterGroup,
  Order,
} from '@zertifier/criteria';

export interface FieldMapping {
  [field: string]: string;
}
export class FieldMapper {
  public static mapFilters(mapping: FieldMapping, filters: Filters): Filters {
    const groups = filters.groups.map((group) => {
      const filters = group.filters.map((filter) => {
        if (Object.keys(mapping).includes(filter.field.value)) {
          return new Filter(
            new Field(mapping[filter.field.value]),
            filter.operator,
            filter.operand,
          );
        }
        return filter;
      });
      return filters.length ? FilterGroup.create(filters) : FilterGroup.EMPTY();
    });
    return groups.length ? new Filters(groups) : Filters.EMPTY();
  }
  public static mapOrders(mapping: FieldMapping, orders: Orders): Orders {
    const mappedOrders = orders.orders.map((order) => {
      if (Object.keys(mapping).includes(order.field.value)) {
        return new Order(
          new Field(mapping[order.field.value]),
          order.direction,
        );
      }
      return order;
    });

    return mappedOrders.length ? Orders.create(mappedOrders) : Orders.EMPTY();
  }

  public static mapCriteria(
    mapping: FieldMapping,
    criteria: Criteria,
  ): Criteria {
    const { filters, orders } = criteria;
    return new Criteria({
      filters: FieldMapper.mapFilters(mapping, filters),
      orders: FieldMapper.mapOrders(mapping, orders),
      skip: criteria.skip,
      limit: criteria.limit,
    });
  }
}
