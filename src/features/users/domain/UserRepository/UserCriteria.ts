import { Criteria, Limit, Skip } from '@zertifier/criteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { FieldValidator } from '../../../../shared/domain/Criteria/FieldValidator';

export class UserCriteria extends Criteria {
  private allowedFilterFields = [
    'name',
    'lastName',
    'email',
    'phoneNumber',
    'id',
    'role',
  ];
  private allowedOrderFields = [
    'name',
    'lastName',
    'email',
    'phoneNumber',
    'id',
    'role',
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
    return new UserCriteria(criteria);
  }

  public static override NONE(): UserCriteria {
    return new UserCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
    });
  }
}
