import { Module } from '@nestjs/common';
import { PrismaSensorsRepository } from './prisma-sensors-repository/prisma-sensors-repository';
import { SensorRepository } from '../domain/SensorRepository';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';

@Module({
  imports: [SharedProvidersModule],
  providers: [{ provide: SensorRepository, useClass: PrismaSensorsRepository }],
  exports: [SensorRepository],
})
export class SensorsModule {}
