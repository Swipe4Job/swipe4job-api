import { SensorCriteria } from './SensorCriteria';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';
import { SensorLegacyId } from './SensorLegacyId';

export class BySensorLegacyId extends SensorCriteria {
  constructor(id: SensorLegacyId) {
    super({
      filters: Filters.create([
        FilterGroup.create([
          Filter.create('legacyId', Operators.EQUAL, id.value),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
