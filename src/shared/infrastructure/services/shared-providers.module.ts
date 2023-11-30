import { Module } from '@nestjs/common';
import { ApplicationLogger } from './application-logger/application-logger';
import { PrismaProvider } from './prisma-client/prisma-provider.service';
import { EnvironmentService } from './environment/environment.service';

@Module({
  providers: [ApplicationLogger, PrismaProvider, EnvironmentService],
  exports: [ApplicationLogger, PrismaProvider],
})
export class SharedProvidersModule {}
