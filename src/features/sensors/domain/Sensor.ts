import { SensorId } from './SensorId';
import { Serializer } from '../../../shared/domain/Serializer';
import { SensorLegacyId } from './SensorLegacyId';

export class Sensor implements Serializer {
  get legacyId(): SensorLegacyId | undefined {
    return this._legacyId;
  }
  constructor() {
    this._id = SensorId.random();
  }

  private _legacyId?: SensorLegacyId;

  private _id: SensorId;

  get id(): SensorId {
    return this._id;
  }

  withLegacyId(legacyId: SensorLegacyId): Sensor {
    this._legacyId = legacyId;
    return this;
  }

  withId(id: SensorId): Sensor {
    this._id = id;
    return this;
  }

  serialize() {
    return {
      id: this._id.value,
      legacyId: this._legacyId?.value,
    };
  }
}
