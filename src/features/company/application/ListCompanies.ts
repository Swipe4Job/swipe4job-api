import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../domain/CompanyRepository.ts/CompanyRepository';
import { CompanyCriteria } from '../domain/CompanyRepository.ts/CompanyCriteria';

@Injectable()
export class ListCompanies {
  constructor(private companyRepository: CompanyRepository) {}
  public async run(criteria: CompanyCriteria) {
    const companies = await this.companyRepository.search(criteria);
    return companies || [];
  }
}
