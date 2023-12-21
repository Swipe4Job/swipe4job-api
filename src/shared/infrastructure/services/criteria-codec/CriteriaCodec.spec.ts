import { Test } from '@nestjs/testing';
import { ApplicationLogger } from '../application-logger/application-logger';
import { CriteriaCodec } from './CriteriaCodec';
import {
  Criteria,
  Field,
  Filter,
  FilterGroup,
  Filters,
  Limit,
  Operand,
  Operator,
  Operators,
  Orders,
  Skip,
} from '@zertifier/criteria';

describe('CriteriaCodec', () => {
  let codecService: CriteriaCodec;
  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [ApplicationLogger, CriteriaCodec],
    }).compile();

    codecService = testingModule.get(CriteriaCodec);
  });
  it('should encode criteria to uri component', () => {
    const criteria = new Criteria({
      filters: new Filters([
        FilterGroup.create([
          new Filter(
            new Field('name'),
            Operator.from(Operators.EQUAL),
            new Operand('Alejandro Marin'),
          ),
        ]),
      ]),
      orders: Orders.EMPTY(),
      skip: Skip.NONE(),
      limit: Limit.NONE(),
    });
    const encodedCriteria = codecService.encode(criteria);
    expect(typeof encodedCriteria).toBe('string');
    const decodedCriteria = codecService.decode(encodedCriteria);
    expect(decodedCriteria.equals(criteria)).toBe(true);

    console.log(encodedCriteria);
  });
});
