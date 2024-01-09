import { SensorId } from './SensorId';
import { Serializer } from '../../../shared/domain/Serializer';
import { UserId } from '../../users/domain/UserID/UserId';

export class Sensor implements Serializer {
  get id(): SensorId {
    return this._id;
  }
  private _id: SensorId;

  private _userId: UserId;

  get userId(): UserId {
    return this._userId;
  }

  constructor(params: { userId: UserId }) {
    this._id = SensorId.random();
    this._userId = params.userId;
  }

  withId(id: SensorId): Sensor {
    this._id = id;
    return this;
  }

  withUserId(userId: UserId): Sensor {
    this._userId = userId;
    return this;
  }

  serialize() {
    return {
      id: this._id.value,
      userId: this._userId.value,
    };
  }
}
