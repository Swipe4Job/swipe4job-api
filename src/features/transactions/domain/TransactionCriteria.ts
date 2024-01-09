import { Criteria, Limit, Skip } from '@zertifier/criteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { FieldValidator } from '../../../shared/domain/Criteria/FieldValidator';

export class TransactionCriteria extends Criteria {
  private allowedFilterFields = [
    'id',
    'sensor_id',
    'destination_wallet',
    'tokens',
    'transaction_date',
    'state',
  ];
  private allowedOrderFields = [
    'id',
    'sensor_id',
    'destination_wallet',
    'tokens',
    'transaction_date',
    'state',
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
    return new TransactionCriteria(criteria);
  }

  public static override NONE(): TransactionCriteria {
    return new TransactionCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
    });
  }
}
