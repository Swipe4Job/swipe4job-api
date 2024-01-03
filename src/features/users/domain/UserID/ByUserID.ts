import { UserCriteria } from '../UserRepository/UserCriteria';
import { UserId } from './UserId';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';

export class ByUserID extends UserCriteria {
  constructor(userId: UserId) {
    super({
      filters: new Filters([
        FilterGroup.create([
          Filter.create('id', Operators.EQUAL, userId.value),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
