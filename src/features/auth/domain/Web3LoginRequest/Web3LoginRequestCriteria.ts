import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { Criteria, Limit, Skip } from '@zertifier/criteria';
import { FieldValidator } from '../../../../shared/domain/Criteria/FieldValidator';

export class Web3LoginRequestCriteria extends Criteria {
  private allowedFilterFields = [];
  private allowedOrderFields = [];

  constructor(params: {
    filters: Filters;
    orders: Orders;
    skip?: Skip;
    limit?: Limit;
  }) {
    super(params);
    const { filters, orders } = params;
    FieldValidator.hasValidFilters(filters, this.allowedFilterFields);
    FieldValidator.hasValidOrders(orders, this.allowedOrderFields);
  }

  public static fromCriteria(criteria: Criteria): Web3LoginRequestCriteria {
    return new Web3LoginRequestCriteria(criteria);
  }

  public static override NONE(): Web3LoginRequestCriteria {
    return new Web3LoginRequestCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
    });
  }
}
