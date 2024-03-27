import { CandidateCVCriteria } from './CandidateCVCriteria';
import { CandidateCVId } from './CandidateCVId';
import { Filter, FilterGroup, Operators } from '@zertifier/criteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';

export class ByCandidateCVId extends CandidateCVCriteria {
  constructor(id: CandidateCVId) {
    super({
      filters: Filters.create([
        FilterGroup.create([Filter.create('id', Operators.EQUAL, id.value)]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
