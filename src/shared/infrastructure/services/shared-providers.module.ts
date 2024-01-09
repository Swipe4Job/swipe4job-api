import { Module } from '@nestjs/common';
import { ApplicationLogger } from './application-logger/application-logger';
import { PrismaProvider } from './prisma-client/prisma-provider.service';
import { EnvironmentService } from './environment/environment.service';
import { PrismaCriteriaService } from './PrismaCriteria/PrismaCriteriaService';
import { CriteriaCodec } from './criteria-codec/CriteriaCodec';
import { EventBus } from './event-bus/event-bus.service';

@Module({
  providers: [
    ApplicationLogger,
    PrismaProvider,
    EnvironmentService,
    PrismaCriteriaService,
    CriteriaCodec,
    EventBus,
  ],
  exports: [
    ApplicationLogger,
    PrismaProvider,
    PrismaCriteriaService,
    EnvironmentService,
    CriteriaCodec,
    EventBus,
  ],
})
export class SharedProvidersModule {}
