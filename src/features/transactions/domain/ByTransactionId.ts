import { TransactionCriteria } from './TransactionCriteria';
import { TransactionId } from './TransactionId';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';

export class ByTransactionId extends TransactionCriteria {
  constructor(id: TransactionId) {
    super({
      filters: Filters.create([
        FilterGroup.create([Filter.create('id', Operators.EQUAL, id.value)]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
