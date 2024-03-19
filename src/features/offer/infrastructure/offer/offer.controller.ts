import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CriteriaCodec } from '../../../../shared/infrastructure/services/criteria-codec/CriteriaCodec';
import { OfferCriteria } from '../../domain/OfferCriteria';
import { SaveJobOfferDTO } from './DTOs/SaveJobOfferDTO';
import { JobOffer } from '../../domain/JobOffer';
import moment from 'moment';
import { JobOfferRepository } from '../../domain/JobOfferRepository/JobOfferRepository';
import { HttpResponse } from '../../../../shared/infrastructure/HttpResponse';
import { ByJobOfferId } from '../../domain/ByJobOfferId';
import { ApiTags } from '@nestjs/swagger';

function formatJobOffer(offer: JobOffer) {
  return {
    ...offer.serialize(),
    publicationDate: moment(offer.serialize().publicationDate).format(
      'YYYY-MM-DD HH:mm',
    ),
  };
}

@ApiTags('offer')
@Controller('offer')
export class OfferController {
  constructor(
    private criteriaCodec: CriteriaCodec,
    private offerRepository: JobOfferRepository,
  ) {}

  // CRUD operations
  @Get()
  async getOffers(@Query('criteria') encodedCriteria: string) {
    const offerCriteria = encodedCriteria
      ? new OfferCriteria(this.criteriaCodec.decode(encodedCriteria))
      : OfferCriteria.NONE();

    // Get offers
    const result = (await this.offerRepository.search(offerCriteria)) || [];
    return HttpResponse.success('success').withData(result.map(formatJobOffer));
  }

  @Post()
  async saveOffer(@Body() body: SaveJobOfferDTO) {
    const offer = new JobOffer({
      ...body,
      publicationDate: moment(
        body.publicationDate,
        'YYYY-MM-DD HH:mm',
      ).toDate(),
    });

    await this.offerRepository.save(offer);
    return HttpResponse.success('Success').withData(formatJobOffer(offer));
  }

  @Put(':id')
  async updateOffer(@Param('id') id: string, @Body() body: SaveJobOfferDTO) {
    const offer = new JobOffer({
      ...body,
      publicationDate: moment(body.publicationDate).toDate(),
    }).withId(id);

    await this.offerRepository.find(new ByJobOfferId(id));
    await this.offerRepository.save(offer);

    return HttpResponse.success('Success').withData(formatJobOffer(offer));
  }

  @Delete()
  async deleteOffer(@Query('criteria') encodedCriteria: string) {
    const offerCriteria = encodedCriteria
      ? new OfferCriteria(this.criteriaCodec.decode(encodedCriteria))
      : OfferCriteria.NONE();

    await this.offerRepository.delete(offerCriteria);
    return HttpResponse.success('');
  }
}
