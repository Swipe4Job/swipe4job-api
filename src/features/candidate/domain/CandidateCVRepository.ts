import { CandidateCVCriteria } from './CandidateCVCriteria';
import { CandidateCV } from './CandidateCV';

export abstract class CandidateCVRepository {
  public abstract find(criteria: CandidateCVCriteria): Promise<CandidateCV[]>;

  public abstract search(
    criteria: CandidateCVCriteria,
  ): Promise<CandidateCV[] | undefined>;

  public abstract save(cv: CandidateCV): Promise<void>;

  public abstract delete(criteria: CandidateCVCriteria): Promise<void>;
}
