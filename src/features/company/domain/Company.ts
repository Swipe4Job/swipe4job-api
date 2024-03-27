import { Serializer } from '../../../shared/domain/Serializer';
import { CompanyPhone } from './Phone/CompanyPhone';
import { Sector } from './Sector';
import { CompanyName } from './CompanyName';
import { CompanyCIF } from './CompanyCIF';
import { CompanySize } from './CompanySize';
import { CompanyDescription } from './CompanyDescription';
import { CompanyId } from './CompanyID/CompanyId';
import { UserId } from '../../users/domain/UserID/UserId';

export class Company implements Serializer {
  constructor(params: {
    id: CompanyId;
    recruiterId: UserId;
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
    this._recruiterId = params.recruiterId;
  }

  private _sector: Sector;

  get sector(): Sector {
    return this._sector;
  }

  private _phone: CompanyPhone;

  get phone(): CompanyPhone {
    return this._phone;
  }

  private _name: CompanyName;

  get name(): CompanyName {
    return this._name;
  }

  private _CIF: CompanyCIF;

  get CIF(): CompanyCIF {
    return this._CIF;
  }

  private _id: CompanyId;

  get id(): CompanyId {
    return this._id;
  }

  private _description: CompanyDescription;

  get description(): CompanyDescription {
    return this._description;
  }

  private _companySize: CompanySize;

  get companySize(): CompanySize {
    return this._companySize;
  }

  private _recruiterId: UserId;

  get recruiterId(): UserId {
    return this._recruiterId;
  }

  public static async create(params: {
    recruiterId: string;
    sector: string;
    phone: string;
    name: string;
    CIF: string;
    description: string;
    companySize: string;
  }) {
    return new Company({
      id: CompanyId.random(),
      recruiterId: new UserId(params.recruiterId),
      sector: Sector.from(params.sector),
      phone: new CompanyPhone(params.phone),
      name: new CompanyName(params.name),
      CIF: new CompanyCIF(params.CIF),
      description: new CompanyDescription(params.description),
      companySize: CompanySize.from(params.companySize),
    });
  }

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
}
