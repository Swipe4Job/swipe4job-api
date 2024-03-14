import { Injectable } from '@nestjs/common';
import { JobOfferRepository } from '../../../domain/JobOfferRepository/JobOfferRepository';
import { OfferCriteria } from '../../../domain/OfferCriteria';
import { JobOffer } from '../../../domain/JobOffer';
import { PrismaProvider } from '../../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { PrismaCriteriaService } from '../../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { BadRequestError } from '../../../../../shared/domain/ApplicationError/BadRequestError';
import { ByJobOfferId } from '../../../domain/ByJobOfferId';

@Injectable()
export class PrismaJobOfferRepository implements JobOfferRepository {
  constructor(
    private prisma: PrismaProvider,
    private prismaCriteria: PrismaCriteriaService,
  ) {}

  async find(criteria: OfferCriteria): Promise<Array<JobOffer>> {
    const offers = await this.search(criteria);
    if (!offers) {
      throw new BadRequestError('Offers not foond');
    }

    return offers;
  }

  async delete(criteria: OfferCriteria): Promise<void> {
    const filters = this.prismaCriteria.convertFilters(criteria.filters);

    await this.prisma.offer.deleteMany({
      where: filters,
    });
  }

  async save(offer: JobOffer): Promise<void> {
    const result = await this.search(new ByJobOfferId(offer.id));
    if (!result) {
      await this.prisma.offer.create({
        data: offer.serialize(),
      });
    } else {
      await this.prisma.offer.update({
        data: offer.serialize(),
        where: {
          id: offer.id,
        },
      });
    }
  }

  async search(criteria: OfferCriteria): Promise<Array<JobOffer> | undefined> {
    const filters = this.prismaCriteria.convertFilters(criteria.filters);
    const orders = this.prismaCriteria.convertOrders(criteria.orders);

    const result = await this.prisma.offer.findMany({
      where: filters,
      orderBy: orders,
      take: criteria.limit.value || undefined,
      skip: criteria.skip.value || undefined,
    });

    if (result.length == 0) {
      return;
    }

    return result.map(
      (r) =>
        new JobOffer({
          jobType: r.jobType,
          salaryRange: r.salaryRange,
          skills: JSON.parse(r.skills),
          workingHours: r.workingHours,
          requirements: r.requirements,
          responsibilities: r.responsabilities,
          description: r.description,
          contractType: r.contractType,
          title: r.title,
          companyName: r.companyName,
          departmentOrganisation: r.departmentOrganization,
          publicationDate: r.publicationDate,
          workingDay: r.workingDay,
          recruiterId: r.recruiterId,
        }),
    );
  }
}
