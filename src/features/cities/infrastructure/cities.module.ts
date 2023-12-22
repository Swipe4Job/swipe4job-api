import { Module } from '@nestjs/common';
import { CitiesController } from './cities/cities.controller';
import { PrismaCitiesRepository } from './prisma-cities-repository/prisma-cities-repository';

@Module({
  controllers: [CitiesController],
  providers: [PrismaCitiesRepository],
})
export class CitiesModule {}
