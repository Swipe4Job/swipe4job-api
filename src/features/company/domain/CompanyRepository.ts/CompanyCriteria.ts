import { Criteria, Limit, Skip } from '@zertifier/criteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { FieldValidator } from '../../../../shared/domain/Criteria/FieldValidator';

export class CompanyCriteria extends Criteria {
  private allowedFilterFields = [
    'sector',
    'phone',
    'name',
    'CIF',
    'companySize',
  ];
  private allowedOrderFields = [
    'sector',
    'phone',
    'name',
    'CIF',
    'companySize',
  ];
  constructor(params: {
    filters: Filters;
    orders: Orders;
    skip?: Skip;
    limit?: Limit;
  }) {
    super(params);
    // Validate filters
    const { filters, orders } = params;
    FieldValidator.hasValidFilters(filters, this.allowedFilterFields);
    FieldValidator.hasValidOrders(orders, this.allowedOrderFields);
  }
  public static fromCriteria(criteria: Criteria) {
    return new CompanyCriteria(criteria);
  }
  public static override NONE(): CompanyCriteria {
    return new CompanyCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
    });
  }
}
