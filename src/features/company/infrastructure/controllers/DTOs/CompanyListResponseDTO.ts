import { Company } from '../../../domain/Company';

export class CompanyListResponseDTO {
  sector: string;
  phone: string;
  name: string;
  CIF: string;
  description: string;
  companySize: string;

  constructor(company: Company) {
    const { sector, phone, name, CIF, description, companySize } =
      company.serialize();
    this.sector = sector;
    this.phone = phone;
    this.name = name;
    this.CIF = CIF;
    this.description = description;
    this.companySize = companySize;
  }
}
