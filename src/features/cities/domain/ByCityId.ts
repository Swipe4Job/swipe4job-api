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
import { CityCriteria } from './CityCriteria';
import { CityId } from './CityId';

export class ByCityId extends CityCriteria {
  constructor(userId: CityId) {
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
