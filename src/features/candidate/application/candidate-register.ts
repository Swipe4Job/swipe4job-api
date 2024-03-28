import { Injectable } from '@nestjs/common';
import { CandidateCVRepository } from '../domain/CandidateCVRepository';
import { Filters, Operators } from '@zertifier/criteria/dist/Filters';
import { Filter, FilterGroup } from '@zertifier/criteria';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { CandidateCVCriteria } from '../domain/CandidateCVCriteria';
import { CandidateCV } from '../domain/CandidateCV';
import { UnexpectedError } from '../../../shared/domain/ApplicationError/UnexpectedError';

@Injectable()
export class CandidateRegister {
  constructor(private candidateRepository: CandidateCVRepository) {}

  public async run(params: {
    candidateId: string;
    description: string;
    studies: Array<string>;
    softSkills: Set<string>;
    name: string;
    lastname: string;
    location: string;
    languages: Array<string>;
    jobExperiences: Array<string>;
  }) {
    const candidate = await CandidateCV.create({
      candidateId: params.candidateId,
      description: params.description,
      studies: new Array<string>(),
      softSkills: new Set<string>(),
      name: params.name,
      lastname: params.lastname,
      location: params.location,
      languages: new Array<string>(),
      jobExperiences: new Array<string>(),
    });
    const criteria = new CandidateCVCriteria({
      filters: Filters.create([
        FilterGroup.create([
          Filter.create('id', Operators.EQUAL, candidate.candidateId.value),
        ]),
        FilterGroup.create([
          Filter.create(
            'candidateId',
            Operators.EQUAL,
            candidate.candidateId.value,
          ),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
    const result = await this.candidateRepository.search(criteria);
    if (result) {
      throw new UnexpectedError();
    }
    await this.candidateRepository.save(candidate);
  }
}
