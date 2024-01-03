import { UserCriteria } from './UserRepository/UserCriteria';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';

export class ByEnabledUser extends UserCriteria {
  constructor(enabled: boolean) {
    super({
      filters: new Filters([
        FilterGroup.create([Filter.create('email', Operators.EQUAL, enabled)]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
