import { Injectable } from '@nestjs/common';
import { SensorRepository } from '../../domain/SensorRepository';
import { Sensor } from '../../domain/Sensor';
import { PrismaProvider } from '../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { SensorCriteria } from '../../domain/SensorCriteria';
import { PrismaCriteriaService } from '../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { SensorLegacyId } from '../../domain/SensorLegacyId';
import { SensorNotFound } from '../../domain/SensorNotFound';
import { BySensorId } from '../../domain/BySensorId';
import {
  FieldMapper,
  FieldMapping,
} from '../../../../shared/domain/Criteria/FieldMapper';
import { SensorId } from '../../domain/SensorId';

@Injectable()
export class PrismaSensorsRepository implements SensorRepository {
  private fieldMapping: FieldMapping = {
    id: 'uuid',
    legacyId: 'id',
  };

  constructor(
    private prisma: PrismaProvider,
    private prismaCriteria: PrismaCriteriaService,
  ) {}

  async delete(criteria: SensorCriteria): Promise<void> {
    throw new Error('not implemented');
    return Promise.resolve(undefined);
  }

  async find(criteria: SensorCriteria): Promise<Sensor[]> {
    const result = await this.search(criteria);
    if (!result) {
      throw new SensorNotFound();
    }
    return result;
  }

  async save(sensor: Sensor): Promise<void> {
    throw new Error('Not implemented');

    const result = await this.search(new BySensorId(sensor.id));
    if (!result) {
      // Create new sensor
      return;
    }
    // Update sensor
  }

  async search(criteria: SensorCriteria): Promise<Sensor[] | undefined> {
    const mapCriteria = FieldMapper.mapCriteria(this.fieldMapping, criteria);
    const filters = this.prismaCriteria.convertFilters(mapCriteria.filters);
    const orders = this.prismaCriteria.convertOrders(mapCriteria.orders);

    const result = await this.prisma.sensors.findMany({
      where: filters,
      orderBy: orders,
      take: mapCriteria.limit.value || undefined,
      skip: mapCriteria.skip.value || undefined,
    });

    if (result.length === 0) {
      return;
    }

    return result.map((r) => {
      return new Sensor()
        .withLegacyId(new SensorLegacyId(r.id))
        .withId(new SensorId(r.uuid));
    });
  }
}
