import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';
import { OfferCriteria } from './OfferCriteria';

export class ByJobOfferId extends OfferCriteria {
  constructor(id: string) {
    super({
      filters: new Filters([
        FilterGroup.create([Filter.create('id', Operators.EQUAL, id)]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
