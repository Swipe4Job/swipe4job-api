import { SensorCriteria } from './SensorCriteria';
import { SensorId } from './SensorId';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';

export class BySensorId extends SensorCriteria {
  constructor(id: SensorId) {
    super({
      filters: Filters.create([
        FilterGroup.create([Filter.create('id', Operators.EQUAL, id.value)]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
