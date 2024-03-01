import { CompanyCriteria } from './CompanyCriteria';
import { CompanyCIF } from '../CompanyCIF';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { Filters, Operators } from '@zertifier/criteria/dist/Filters';
import { Filter, FilterGroup } from '@zertifier/criteria';

export class ByCompanyCIF extends CompanyCriteria {
  constructor(cif: CompanyCIF) {
    super({
      filters: Filters.create([
        FilterGroup.create([Filter.create('CIF', Operators.EQUAL, cif.value)]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
