import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { Criteria, Limit, Skip } from '@zertifier/criteria';
import { FieldValidator } from '../../../shared/domain/Criteria/FieldValidator';

export class CandidateCVCriteria extends Criteria {
  private allowedFilterFields = [
    'id',
    'userId',
    'description',
    'studies',
    'softSkills',
    'location',
    'languages',
    'jobExperiences',
  ];
  private allowedOrderFields = [
    'id',
    'userId',
    'description',
    'studies',
    'softSkills',
    'location',
    'languages',
    'jobExperiences',
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

  public static override NONE(): CandidateCVCriteria {
    return new CandidateCVCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
    });
  }
  public static fromCriteria(criteria: Criteria) {
    return new CandidateCVCriteria(criteria);
  }
}
