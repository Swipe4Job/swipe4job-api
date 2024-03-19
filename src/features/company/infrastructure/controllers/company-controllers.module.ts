import { Module } from '@nestjs/common';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';
import { CompanyController } from './company-controller/company.controller';
import { CompanyRegister } from '../../application/CompanyRegister';
import { ListCompanies } from '../../application/ListCompanies';
import { AuthModule } from '../../../auth/infrastructure/auth.module';
import { CompanyRepositoriesModule } from '../repositories/company-repositories.module';
import { CompanyUpdate } from '../../application/company-update';
import { CompanyDelete } from '../../application/company-delete';

@Module({
  providers: [CompanyRegister, ListCompanies, CompanyUpdate, CompanyDelete],
  controllers: [CompanyController],
  imports: [SharedProvidersModule, CompanyRepositoriesModule, AuthModule],
})
export class CompanyControllersModule {}
