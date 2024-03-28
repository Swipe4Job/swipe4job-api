import { Injectable, NotFoundException } from '@nestjs/common';
import { CandidateCVRepository } from '../domain/CandidateCVRepository';
import { CandidateCV } from '../domain/CandidateCV';
import { ByCandidateCVId } from '../domain/ByCandidateCVId';

@Injectable()
export class CandidateUpdate {
  constructor(private candidateRepository: CandidateCVRepository) {}

  public async run(candidate: CandidateCV) {
    // Verificar si el candidato existe antes de intentar actualizarlo
    const existingCandidate = await this.candidateRepository.find(
      new ByCandidateCVId(candidate.id),
    );
    if (!existingCandidate) {
      throw new NotFoundException('Candidate not found');
    }
    await this.candidateRepository.save(candidate);
  }
}
