import { Injectable } from '@nestjs/common';
import { CandidateCVRepository } from '../domain/CandidateCVRepository';
import { CandidateCVCriteria } from '../domain/CandidateCVCriteria';

@Injectable()
export class CandidateDelete {
  constructor(private candidateRepository: CandidateCVRepository) {}

  public async run(criteria: CandidateCVCriteria) {
    await this.candidateRepository.delete(criteria);
  }
}
