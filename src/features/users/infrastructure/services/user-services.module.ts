import { Module } from '@nestjs/common';
import { UserContextService } from '../../domain/UserContextService';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';
import { UserRepositoriesModule } from '../repositories/user-repositories.module';

@Module({
  imports: [SharedProvidersModule, UserRepositoriesModule],
  providers: [UserContextService],
  exports: [UserContextService],
})
export class UserServicesModule {}
