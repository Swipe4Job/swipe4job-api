import { Filters, Orders } from '@zertifier/criteria';
import { InvalidFilterField } from './InvalidFilterField';
import { InvalidOrderField } from './InvalidOrderField';

export class FieldValidator {
  public static hasValidFilters(filters: Filters, fields: string[]) {
    const filterFields = filters.groups.flatMap((group) =>
      group.filters.map((filter) => filter.field.value),
    );
    for (const field of filterFields) {
      if (!fields.includes(field)) {
        throw new InvalidFilterField(
          `Invalid filter field. Allowed fields: [${fields.join(', ')}]`,
        );
      }
    }
  }

  public static hasValidOrders(orders: Orders, fields: string[]) {
    const orderFields = orders.orders.flatMap((order) => order.field.value);
    for (const field of orderFields) {
      if (!fields.includes(field)) {
        throw new InvalidOrderField(
          `Invalid order field. Allowed fields: [${fields.join(', ')}]`,
        );
      }
    }
  }
}
