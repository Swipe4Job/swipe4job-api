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
import { Web3LoginRequestCriteria } from './Web3LoginRequestCriteria';
import { Web3LoginRequestId } from './Web3LoginRequestId';

export class ByWeb3LoginRequestId extends Web3LoginRequestCriteria {
  constructor(requestId: Web3LoginRequestId) {
    super({
      filters: new Filters([
        FilterGroup.create([
          new Filter(
            new Field('id'),
            Operator.from(Operators.EQUAL),
            new Operand(requestId.value),
          ),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
