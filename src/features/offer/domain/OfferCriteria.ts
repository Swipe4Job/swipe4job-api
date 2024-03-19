import { Criteria, Limit, Skip } from '@zertifier/criteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { FieldValidator } from '../../../shared/domain/Criteria/FieldValidator';

export class OfferCriteria extends Criteria {
  private allowedFilterFields = [
    'id',
    'title',
    'companyName',
    'description',
    'responsibilities',
    'requirements',
    'jobType',
    'workingDay',
    'salary',
    'workingHours',
    'departmentOrganization',
    'publicationDate',
  ];
  private allowedOrderFields = [
    'id',
    'title',
    'companyName',
    'salary',
    'publicationDate',
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

  public static override NONE(): OfferCriteria {
    return new OfferCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
    });
  }
}
