import { UserCriteria } from '../UserRepository/UserCriteria';
import {
  Field,
  Filter,
  FilterGroup,
  Filters,
  Operand,
  Operator,
  Operators,
  Orders,
} from '@zertifier/criteria';
import { UserEmail } from './UserEmail';

export class ByUserEmail extends UserCriteria {
  constructor(userEmail: UserEmail) {
    super({
      filters: new Filters([
        FilterGroup.create([
          new Filter(
            new Field('email'),
            Operator.from(Operators.EQUAL),
            new Operand(userEmail.value),
          ),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
