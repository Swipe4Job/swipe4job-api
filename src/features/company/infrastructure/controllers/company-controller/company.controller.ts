import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CriteriaCodec } from '../../../../../shared/infrastructure/services/criteria-codec/CriteriaCodec';
import { CompanyRegister } from '../../../application/CompanyRegister';
import { ListCompanies } from '../../../application/ListCompanies';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';
import { CompanyCriteria } from '../../../domain/CompanyRepository.ts/CompanyCriteria';
import { CompanyListResponseDTO } from '../DTOs/CompanyListResponseDTO';
import { CompanyRegisterRequestDTO } from '../DTOs/CompanyRegisterRequestDTO';
import { CompanyUpdate } from '../../../application/company-update';
import { Company } from '../../../domain/Company';
import { CompanyId } from '../../../domain/CompanyID/CompanyId';
import { CompanySize } from '../../../domain/CompanySize';
import { CompanyCIF } from '../../../domain/CompanyCIF';
import { CompanyName } from '../../../domain/CompanyName';
import { CompanyDescription } from '../../../domain/CompanyDescription';
import { Sector } from '../../../domain/Sector';
import { CompanyPhone } from '../../../domain/Phone/CompanyPhone';

@Controller('company')
export class CompanyController {
  constructor(
    private companyRegister: CompanyRegister,
    private criteriaCodec: CriteriaCodec,
    private listCompanies: ListCompanies,
    private companyUpdate: CompanyUpdate,
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
  async updateCompany(
    @Body() body: CompanyRegisterRequestDTO,
    @Param('id') id: string,
  ) {
    const company = new Company({
      id: new CompanyId(id),
      companySize: CompanySize.from(body.companySize),
      CIF: new CompanyCIF(body.CIF),
      name: new CompanyName(body.name),
      description: new CompanyDescription(body.description || ''),
      sector: Sector.from(body.sector),
      phone: new CompanyPhone(body.phone),
    });
    await this.companyUpdate.run(company);
  }
}
