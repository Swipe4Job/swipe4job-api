import { Module } from '@nestjs/common';
import { PrismaCandidateCvRepository } from './prisma-candidate-cv-repository/prisma-candidate-cv-repository';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';
import { CandidateCVRepository } from '../../domain/CandidateCVRepository';

@Module({
  providers: [
    { provide: CandidateCVRepository, useClass: PrismaCandidateCvRepository },
  ],
  imports: [SharedProvidersModule],
  exports: [CandidateCVRepository],
})
export class RepositoriesModule {}
