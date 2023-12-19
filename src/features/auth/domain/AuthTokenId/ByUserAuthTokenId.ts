import { UserAuthTokenCriteria } from '../UserAuthTokenCriteria';
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
import { AuthTokenId } from './AuthTokenId';

export class ByUserAuthTokenId extends UserAuthTokenCriteria {
  constructor(userId: AuthTokenId) {
    super({
      filters: new Filters([
        FilterGroup.create([
          new Filter(
            new Field('id'),
            Operator.from(Operators.EQUAL),
            new Operand(userId.value),
          ),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
