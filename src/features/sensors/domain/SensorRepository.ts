import { Sensor } from './Sensor';
import { SensorCriteria } from './SensorCriteria';

export abstract class SensorRepository {
  abstract save(sensor: Sensor): Promise<void>;
  abstract search(
    sensorCriteria: SensorCriteria,
  ): Promise<Sensor[] | undefined>;
  abstract find(sensorCriteria: SensorCriteria): Promise<Sensor[]>;
  abstract delete(sensorCriteria: SensorCriteria): Promise<void>;
}
