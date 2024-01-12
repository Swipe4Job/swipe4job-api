import { Criteria, Limit, Skip } from '@zertifier/criteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { FieldValidator } from '../../../shared/domain/Criteria/FieldValidator';

export class SensorCriteria extends Criteria {
  private allowedFilterFields = ['id', 'legacyId'];
  private allowedOrderFields = ['id', 'legacyId'];

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

  public static override NONE(): SensorCriteria {
    return new SensorCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
    });
  }
}
