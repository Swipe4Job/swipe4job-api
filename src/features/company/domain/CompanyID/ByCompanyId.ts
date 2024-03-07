import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';
import { CompanyCriteria } from '../CompanyRepository.ts/CompanyCriteria';
import { CompanyId } from './CompanyId';

export class ByCompanyId extends CompanyCriteria {
  constructor(companyId: CompanyId) {
    super({
      filters: new Filters([
        FilterGroup.create([
          Filter.create('id', Operators.EQUAL, companyId.value),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
