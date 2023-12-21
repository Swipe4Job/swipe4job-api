import {
  Criteria,
  Filter,
  Field,
  Operator,
  Operand,
  FilterGroup,
  Order,
  OrderDirection,
  Skip,
  Limit,
} from '@zertifier/criteria';
import { InvalidArgument } from '../../../domain/InvalidArgument';
import { Injectable } from '@nestjs/common';
import { ApplicationLogger } from '../application-logger/application-logger';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';

@Injectable()
export class CriteriaCodec {
  constructor(private logger: ApplicationLogger) {}
  encode(criteria: Criteria): string {
    return encodeURIComponent(JSON.stringify(criteria.serialize()));
  }

  decode(value: string): Criteria {
    let rawCriteria;
    try {
      rawCriteria = JSON.parse(decodeURIComponent(value));
    } catch (error) {
      throw new InvalidArgument('Cannot decode criteria');
    }

    try {
      const { filters, orders, skip, limit } = rawCriteria;
      const criteriaFilters = this.getFiltersFromRaw(filters);
      const criteriaOrders = this.getOrdersFromRaw(orders);
      const criteriaSkip = new Skip(skip);
      const criteriaLimit = new Limit(limit);

      return new Criteria({
        filters: criteriaFilters,
        orders: criteriaOrders,
        limit: criteriaLimit,
        skip: criteriaSkip,
      });
    } catch (err) {
      this.logger.debug(err);
      throw new InvalidArgument('Encoded criteria has wrong data', true);
    }
  }

  private getFiltersFromRaw(filters: any) {
    let criteriaFilters: Filters;
    const filterGroups: FilterGroup[] = [];
    for (const group of filters) {
      const filterCollection: Filter[] = [];
      for (const filter of group) {
        const criteriaFilter = new Filter(
          new Field(filter.field),
          Operator.from(filter.operator),
          new Operand(filter.operand),
        );
        filterCollection.push(criteriaFilter);
      }

      if (filterCollection.length === 0) {
        filterGroups.push(FilterGroup.EMPTY());
      } else {
        filterGroups.push(FilterGroup.create(filterCollection));
      }
    }
    if (filterGroups.length === 0) {
      criteriaFilters = Filters.EMPTY();
    } else {
      criteriaFilters = Filters.create(filterGroups);
    }

    return criteriaFilters;
  }

  private getOrdersFromRaw(orders: any) {
    return orders.length === 0
      ? Orders.EMPTY()
      : orders.map(
          (order: any) =>
            new Order(
              new Field(order.field),
              OrderDirection.from(order.direction),
            ),
        );
  }
}
