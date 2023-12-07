import { PrismaCriteriaService } from './PrismaCriteriaService';
import {
  Field,
  Filter,
  Operand,
  Operator,
  Operators,
} from '@zertifier/criteria';

describe('PrismaCriteriaService', () => {
  it('should be instantiated', () => {
    expect(() => new PrismaCriteriaService()).not.toThrow();
  });
  it('should parse filter', () => {
    const service = new PrismaCriteriaService();
    const tests: { filter: Filter; rawObject: any }[] = [
      {
        filter: new Filter(
          new Field('name'),
          Operator.from(Operators.EQUAL),
          new Operand('hello'),
        ),
        rawObject: {
          name: {
            equals: 'hello',
          },
        },
      },
      {
        filter: new Filter(
          new Field('name'),
          Operator.from(Operators.NOT_EQUAL),
          new Operand('hello'),
        ),
        rawObject: {
          name: {
            not: {
              equals: 'hello',
            },
          },
        },
      },
      {
        filter: new Filter(
          new Field('name'),
          Operator.from(Operators.IN),
          new Operand(['hello', 'adrian']),
        ),
        rawObject: {
          name: {
            in: ['hello', 'adrian'],
          },
        },
      },
      {
        filter: new Filter(
          new Field('name'),
          Operator.from(Operators.LIKE),
          new Operand('hello'),
        ),
        rawObject: {
          name: {
            contains: 'hello',
          },
        },
      },
      {
        filter: new Filter(
          new Field('name'),
          Operator.from(Operators.GREATER),
          new Operand('hello'),
        ),
        rawObject: {
          name: {
            gt: 'hello',
          },
        },
      },
      {
        filter: new Filter(
          new Field('name'),
          Operator.from(Operators.LOWER),
          new Operand('hello'),
        ),
        rawObject: {
          name: {
            lt: 'hello',
          },
        },
      },
      {
        filter: new Filter(
          new Field('name'),
          Operator.from(Operators.GREATER_EQUAL),
          new Operand('hello'),
        ),
        rawObject: {
          name: {
            gte: 'hello',
          },
        },
      },
      {
        filter: new Filter(
          new Field('name'),
          Operator.from(Operators.LOWER_EQUAL),
          new Operand('hello'),
        ),
        rawObject: {
          name: {
            lte: 'hello',
          },
        },
      },
    ];

    for (const test of tests) {
      const convertedFilter = service.convertFilter(test.filter);
      expect(convertedFilter).toEqual(test.rawObject);
    }
  });
});
