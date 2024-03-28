import { Injectable } from '@nestjs/common';
import { CandidateCVRepository } from '../domain/CandidateCVRepository';
import { CandidateCVCriteria } from '../domain/CandidateCVCriteria';

@Injectable()
export class CandidateList {
  constructor(private candidateRepository: CandidateCVRepository) {}
  public async run(criteria: CandidateCVCriteria) {
    const companies = await this.candidateRepository.search(criteria);
    return companies || [];
  }
}
