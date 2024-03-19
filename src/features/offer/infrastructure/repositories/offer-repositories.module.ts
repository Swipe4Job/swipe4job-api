import { Module } from '@nestjs/common';
import { PrismaJobOfferRepository } from './prisma-job-offer-repository/prisma-job-offer-repository.service';
import { JobOfferRepository } from '../../domain/JobOfferRepository/JobOfferRepository';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';

@Module({
  imports: [SharedProvidersModule],
  providers: [
    { provide: JobOfferRepository, useClass: PrismaJobOfferRepository },
  ],
  exports: [JobOfferRepository]
})
export class OfferRepositoriesModule {}
