import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { PrismaCriteriaService } from '../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { ApplicationLogger } from '../../../../shared/infrastructure/services/application-logger/application-logger';
import { CompanyRepository } from '../../domain/CompanyRepository.ts/CompanyRepository';
import { Company } from '../../domain/Company';
import { CompanyCriteria } from '../../domain/CompanyRepository.ts/CompanyCriteria';
import { CompanyNotFound } from '../../domain/CompanyRepository.ts/CompanyNotFound';
import { PersistenceError } from '../../../../shared/domain/PersistenceError';
import { CompanyId } from '../../domain/CompanyID/CompanyId';
import { Sector } from '../../domain/Sector';
import { CompanyPhone } from '../../domain/Phone/CompanyPhone';
import { CompanyName } from '../../domain/CompanyName';
import { CompanyDescription } from '../../domain/CompanyDescription';
import { CompanySize } from '../../domain/CompanySize';
import { CompanyCIF } from '../../domain/CompanyCIF';
import { ByCompanyId } from '../../domain/CompanyID/ByCompanyId';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(
    private prisma: PrismaProvider,
    private prismaCriteriaService: PrismaCriteriaService,
    private logger: ApplicationLogger,
  ) {}
  async find(criteria: CompanyCriteria): Promise<Array<Company>> {
    const companies = await this.search(criteria);
    if (!companies) {
      throw new CompanyNotFound();
    }
    return companies;
  }

  async search(criteria: CompanyCriteria): Promise<Array<Company> | undefined> {
    const filters = this.prismaCriteriaService.convertFilters(criteria.filters);
    const orders = this.prismaCriteriaService.convertOrders(criteria.orders);
    let result;
    try {
      result = await this.prisma.company.findMany({
        where: filters,
        orderBy: orders as any,
        skip: criteria.skip.value || undefined,
        take: criteria.limit.value || undefined,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error getting companies from database');
    }
    if (result.length == 0) {
      return;
    }
    return result.map((entry) => {
      return new Company({
        id: new CompanyId(entry.id),
        sector: Sector.from(entry.sector),
        phone: new CompanyPhone(entry.phone),
        name: new CompanyName(entry.name),
        CIF: new CompanyCIF(entry.CIF),
        description: new CompanyDescription(entry.description),
        companySize: CompanySize.from(entry.companySize),
      });
    });
  }
  async save(company: Company): Promise<void> {
    const companies = await this.search(new ByCompanyId(company.id));
    if (!companies) {
      // Create companies
      await this.prisma.company.create({
        data: {
          id: company.id.value,
          sector: company.sector.value,
          phone: company.phone.value,
          name: company.name.value,
          CIF: company.CIF.value,
          description: company.description.value,
          companySize: company.companySize?.value,
        },
      });
    } else {
      // Update companies
      await this.prisma.company.update({
        data: {
          sector: company.sector.value,
          phone: company.phone.value,
          name: company.name.value,
          CIF: company.CIF.value,
          description: company.description.value,
        },
        where: { id: company.id.value },
      });
    }
  }
  async delete(criteria: CompanyCriteria): Promise<void> {
    const filters = this.prismaCriteriaService.convertFilters(criteria.filters);
    try {
      await this.prisma.company.deleteMany({
        where: filters,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error removing companies');
    }
  }
}
