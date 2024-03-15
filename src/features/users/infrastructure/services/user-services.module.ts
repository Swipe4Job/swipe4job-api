import { Module } from '@nestjs/common';
import { UserContextService } from '../../domain/UserContextService';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';
import { UserRepositoriesModule } from '../repositories/user-repositories.module';
import { UserAdminService } from './user-admin/user-admin.service';

@Module({
  imports: [SharedProvidersModule, UserRepositoriesModule],
  providers: [UserContextService, UserAdminService],
  exports: [UserContextService],
})
export class UserServicesModule {}
