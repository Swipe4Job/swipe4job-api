import { Module } from '@nestjs/common';
import { PrismaCompanyRepository } from './PrismaCompanyRepository';
import { CompanyRepository } from '../../domain/CompanyRepository.ts/CompanyRepository';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';

@Module({
  providers: [
    { provide: CompanyRepository, useClass: PrismaCompanyRepository },
  ],
  exports: [CompanyRepository],
  imports: [SharedProvidersModule],
})
export class CompanyRepositoriesModule {}
