import { Module } from '@nestjs/common';
import { ApplicationLogger } from './application-logger/application-logger';
import { PrismaProvider } from './prisma-client/prisma-provider.service';
import { EnvironmentService } from './environment/environment.service';
import { PrismaCriteriaService } from './PrismaCriteria/PrismaCriteriaService';

@Module({
  providers: [
    ApplicationLogger,
    PrismaProvider,
    EnvironmentService,
    PrismaCriteriaService,
  ],
  exports: [
    ApplicationLogger,
    PrismaProvider,
    PrismaCriteriaService,
    EnvironmentService,
  ],
})
export class SharedProvidersModule {}
