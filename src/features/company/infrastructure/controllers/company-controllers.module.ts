import { Module } from '@nestjs/common';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';
import { CompanyController } from './company-controller/company.controller';

@Module({
  providers: [],
  controllers: [CompanyController],
  imports: [SharedProvidersModule],
})
export class CompanyControllersModule {}
