import { Module } from '@nestjs/common';
import { PrismaSensorsRepository } from './prisma-sensors-repository/prisma-sensors-repository';
import { SensorRepository } from '../domain/SensorRepository';

@Module({
  providers: [{ provide: SensorRepository, useClass: PrismaSensorsRepository }]
})
export class SensorsModule {}
