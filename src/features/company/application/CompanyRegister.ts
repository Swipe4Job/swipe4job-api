import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../domain/CompanyRepository.ts/CompanyRepository';
import { Company } from '../domain/Company';
import { CompanyCriteria } from '../domain/CompanyRepository.ts/CompanyCriteria';
import { Filters, Operators } from '@zertifier/criteria/dist/Filters';
import { Filter, FilterGroup } from '@zertifier/criteria';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { CompanyAlreadyRegistered } from '../domain/CompanyAlreadyRegistered';

@Injectable()
export class CompanyRegister {
  constructor(private companyRepository: CompanyRepository) {}

  public async run(params: {
    sector: string;
    phone: string;
    name: string;
    CIF: string;
    recruiterId: string;
    description?: string;
    companySize: string;
  }) {
    const company = await Company.create({
      name: params.name,
      recruiterId: params.recruiterId,
      sector: params.sector,
      phone: params.phone,
      CIF: params.CIF,
      companySize: params.companySize,
      description: params.description || '',
    });
    const criteria = new CompanyCriteria({
      filters: Filters.create([
        FilterGroup.create([
          Filter.create('CIF', Operators.EQUAL, company.CIF.value),
        ]),
        FilterGroup.create([
          Filter.create('phone', Operators.EQUAL, company.phone.value),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
    const result = await this.companyRepository.search(criteria);
    if (result) {
      throw new CompanyAlreadyRegistered();
    }
    // TODO check recruiter id
    await this.companyRepository.save(company);
  }
}
