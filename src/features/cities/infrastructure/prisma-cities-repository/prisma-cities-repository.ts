import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../domain/CitiesRepository';
import { City } from '../../domain/City';
import { CityCriteria } from '../../domain/CityCriteria';
import { PrismaProvider } from '../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { ByCityId } from '../../domain/ByCityId';

@Injectable()
export class PrismaCitiesRepository implements CitiesRepository {
  constructor(private prisma: PrismaProvider) {}
  delete(city: City): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria: CityCriteria): Promise<City[]> {
    return Promise.resolve([]);
  }

  async save(city: City): Promise<void> {
    const results = await this.search(new ByCityId(city.id));
    if (results) {
      // Cities found update city
    } else {
      // Create new city
      await this.prisma.municipalities.create({
        data: {
          id: city.id.value,
          name: city.name.value,
          coordinates: JSON.stringify(city.coordinates.value),
          province_id: city.id.value,
        },
      });
    }
  }

  search(criteria: CityCriteria): Promise<City[] | undefined> {
    return Promise.resolve(undefined);
  }
}
