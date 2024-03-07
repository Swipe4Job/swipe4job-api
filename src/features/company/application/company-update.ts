import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../domain/CompanyRepository.ts/CompanyRepository';
import { ByCompanyId } from '../domain/CompanyID/ByCompanyId';
import { Company } from '../domain/Company';

@Injectable()
export class CompanyUpdate {
  constructor(private companyRepository: CompanyRepository) {}

  public async run(company: Company) {
    await this.companyRepository.find(new ByCompanyId(company.id));
    await this.companyRepository.save(company);
  }
}
