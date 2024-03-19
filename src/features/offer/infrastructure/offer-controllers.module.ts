import { Delete, Get, Module, Post, Put, Query } from '@nestjs/common';
import { CriteriaCodec } from '../../../shared/infrastructure/services/criteria-codec/CriteriaCodec';
import { OfferCriteria } from '../domain/OfferCriteria';
import { OfferController } from './offer/offer.controller';
import { SharedProvidersModule } from '../../../shared/infrastructure/services/shared-providers.module';
import { OfferRepositoriesModule } from './repositories/offer-repositories.module';

@Module({
  controllers: [OfferController],
  imports: [SharedProvidersModule, OfferRepositoriesModule]
})
export class OfferControllersModule {

}
