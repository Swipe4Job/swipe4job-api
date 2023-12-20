import { Criteria, Limit, Skip } from '@zertifier/criteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { FieldValidator } from '../../../../shared/domain/Criteria/FieldValidator';

export class UserCriteria extends Criteria {
  private allowedFilterFields = [
    'username',
    'email',
    'walletAddress',
    'phoneNumber',
    'id',
    'role',
  ];
  private allowedOrderFields = [
    'username',
    'email',
    'walletAddress',
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

  public static override NONE(): UserCriteria {
    return new UserCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
    });
  }
}
