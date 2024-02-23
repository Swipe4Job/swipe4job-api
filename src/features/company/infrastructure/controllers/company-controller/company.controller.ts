import { Controller, Get, Query } from '@nestjs/common';
import { CriteriaCodec } from '../../../../../shared/infrastructure/services/criteria-codec/CriteriaCodec';
import { CompanyRepository } from '../../../domain/CompanyRepository.ts/CompanyRepository';

@Controller('company')
export class CompanyController {
  constructor(
    private companyRepository: CompanyRepository,
    private criteriaCodec: CriteriaCodec,
  ) {}
}
