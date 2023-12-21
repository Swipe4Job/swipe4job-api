import { Module } from '@nestjs/common';
import { ApplicationLogger } from './application-logger/application-logger';
import { PrismaProvider } from './prisma-client/prisma-provider.service';
import { EnvironmentService } from './environment/environment.service';
import { PrismaCriteriaService } from './PrismaCriteria/PrismaCriteriaService';
import { CriteriaCodec } from './criteria-codec/CriteriaCodec';

@Module({
  providers: [
    ApplicationLogger,
    PrismaProvider,
    EnvironmentService,
    PrismaCriteriaService,
    CriteriaCodec,
  ],
  exports: [
    ApplicationLogger,
    PrismaProvider,
    PrismaCriteriaService,
    EnvironmentService,
    CriteriaCodec,
  ],
})
export class SharedProvidersModule {}
