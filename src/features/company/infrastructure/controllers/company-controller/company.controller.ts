import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { CriteriaCodec } from '../../../../../shared/infrastructure/services/criteria-codec/CriteriaCodec';
import { CompanyRegister } from '../../../application/CompanyRegister';
import { ListCompanies } from '../../../application/ListCompanies';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';
import { CompanyCriteria } from '../../../domain/CompanyRepository.ts/CompanyCriteria';
import { CompanyListResponseDTO } from '../DTOs/CompanyListResponseDTO';
import { CompanyRegisterRequestDTO } from '../DTOs/CompanyRegisterRequestDTO';

@Controller('company')
export class CompanyController {
  constructor(
    private companyRegister: CompanyRegister,
    private criteriaCodec: CriteriaCodec,
    private listCompanies: ListCompanies,
  ) {}

  @Get()
  async getCompanies(@Query('criteria') encodedCriteria: string) {
    const companyCriteria = encodedCriteria
      ? CompanyCriteria.fromCriteria(this.criteriaCodec.decode(encodedCriteria))
      : CompanyCriteria.NONE();
    const companies = await this.listCompanies.run(companyCriteria);
    return HttpResponse.success('Company fetched successfully').withData(
      companies.map((company) => new CompanyListResponseDTO(company)),
    );
  }
  @Post('')
  async registerCompany(@Body() body: CompanyRegisterRequestDTO) {
    await this.companyRegister.run(body);
    return HttpResponse.success('Company registered successfully');
  }

  @Put(':id')
  async updateCompany() {

  }
}
