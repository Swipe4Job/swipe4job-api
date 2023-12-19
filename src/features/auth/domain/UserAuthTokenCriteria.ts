import { Criteria, Limit, Skip } from '@zertifier/criteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { InvalidFilterField } from '../../../shared/domain/Criteria/InvalidFilterField';
import { InvalidOrderField } from '../../../shared/domain/Criteria/InvalidOrderField';

export class UserAuthTokenCriteria extends Criteria {
  private allowedFilterFields = ['id', 'expirationDate'];
  private allowedOrderFields = ['id', 'expirationDate'];

  constructor(params: {
    filters: Filters;
    orders: Orders;
    skip?: Skip;
    limit?: Limit;
  }) {
    super(params);
    // Validate filters
    const { filters } = params;
    const filterFields = filters.groups.flatMap((group) =>
      group.filters.map((filter) => filter.field.value),
    );
    for (const field of filterFields) {
      if (!this.allowedFilterFields.includes(field)) {
        throw new InvalidFilterField(
          `Invalid user auth token filter field. Allowed fields: [${this.allowedFilterFields.join(
            ', ',
          )}]`,
        );
      }
    }

    const { orders } = params;
    const orderFields = orders.orders.flatMap((order) => order.field.value);
    for (const field of orderFields) {
      if (!this.allowedOrderFields.includes(field)) {
        throw new InvalidOrderField(
          `Invalid user auth token order field. Allowed fields: [${this.allowedOrderFields.join(
            ', ',
          )}]`,
        );
      }
    }
  }

  public static override NONE(): UserAuthTokenCriteria {
    return new UserAuthTokenCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
    });
  }
}
