import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/CompanyRepository.ts/CompanyRepository';
import { CompanyCriteria } from '../../domain/CompanyRepository.ts/CompanyCriteria';

@Injectable()
export class CompanyDelete {
  constructor(private companyRepository: CompanyRepository) {}

  public async run(criteria: CompanyCriteria) {
    await this.companyRepository.delete(criteria);
  }
}
