import { UserCriteria } from '../UserRepository/UserCriteria';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';
import { UserEmail } from './UserEmail';

export class ByUserEmail extends UserCriteria {
  constructor(userEmail: UserEmail) {
    super({
      filters: new Filters([
        FilterGroup.create([
          Filter.create('email', Operators.EQUAL, userEmail.value),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
