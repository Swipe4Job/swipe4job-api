import { Serializer } from '../../../shared/domain/Serializer';
import { CompanyPhone } from './Phone/CompanyPhone';
import { Sector } from './Sector';
import { CompanyName } from './CompanyName';
import { CompanyCIF } from './CompanyCIF';
import { CompanySize } from './CompanySize';
import { CompanyDescription } from './CompanyDescription';
import { CompanyId } from './CompanyID/CompanyId';

export class Company implements Serializer {
  private _sector: Sector;
  private _phone: CompanyPhone;
  private _name: CompanyName;
  private _CIF: CompanyCIF;
  private _id: CompanyId;
  private _description: CompanyDescription;
  private _companySize: CompanySize;
  serialize() {
    return {
      id: this.id.value,
      sector: this.sector.value,
      phone: this.phone.value,
      name: this.name.value,
      CIF: this.CIF.value,
      description: this.description.value,
      companySize: this.companySize.value,
    };
  }
  constructor(params: {
    id: CompanyId;
    sector: Sector;
    phone: CompanyPhone;
    name: CompanyName;
    CIF: CompanyCIF;
    description: CompanyDescription;
    companySize: CompanySize;
  }) {
    this._sector = params.sector;
    this._phone = params.phone;
    this._name = params.name;
    this._CIF = params.CIF;
    this._description = params.description;
    this._companySize = params.companySize;
    this._id = params.id;
  }

  public static async create(params: {
    sector: string;
    phone: string;
    name: string;
    CIF: string;
    description: string;
    companySize: string;
  }) {
    return new Company({
      id: CompanyId.random(),
      sector: Sector.from(params.sector),
      phone: new CompanyPhone(params.phone),
      name: new CompanyName(params.name),
      CIF: new CompanyCIF(params.CIF),
      description: new CompanyDescription(params.description),
      companySize: CompanySize.from(params.companySize),
    });
  }

  get sector(): Sector {
    return this._sector;
  }

  get phone(): CompanyPhone {
    return this._phone;
  }

  get name(): CompanyName {
    return this._name;
  }

  get CIF(): CompanyCIF {
    return this._CIF;
  }

  get description(): CompanyDescription {
    return this._description;
  }

  get companySize(): CompanySize {
    return this._companySize;
  }

  get id(): CompanyId {
    return this._id;
  }
}
