import { OfferCriteria } from '../OfferCriteria';
import { JobOffer } from '../JobOffer';

export abstract class JobOfferRepository {
  abstract find(criteria: OfferCriteria): Promise<Array<JobOffer>>;
  abstract search(
    criteria: OfferCriteria,
  ): Promise<Array<JobOffer> | undefined>;
  abstract save(user: JobOffer): Promise<void>;
  abstract delete(criteria: OfferCriteria): Promise<void>;
}
