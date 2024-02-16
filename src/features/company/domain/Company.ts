import { Serializer } from '../../../shared/domain/Serializer';

export class Company implements Serializer {
  private _sector: string;
  private _phone: number;
  private _name: string;
  private _CIF: string;
  private _description: string;
  private _companySize: string;

  serialize() {
    return {
      sector: this.sector,
      phone: this.phone,
      name: this.name,
      CIF: this.CIF,
      description: this.description,
      companySize: this.companySize,
    };
  }

  constructor(params: {
    sector: string;
    phone: number;
    name: string;
    CIF: string;
    description: string;
    companySize: string;
  }) {
    this._sector = params.sector;
    this._phone = params.phone;
    this._name = params.name;
    this._CIF = params.CIF;
    this._description = params.description;
    this._companySize = params.companySize;
  }

  get phone(): number {
    return this._phone;
  }

  get CIF(): string {
    return this._CIF;
  }

  get description() {
    return this._description;
  }

  get sector(): string {
    return this._sector;
  }

  get name(): string {
    return this._name;
  }

  get companySize(): string {
    return this._companySize;
  }
  /*ja que ara companySize i sector tenen la seva propia clase
 no se si se hauria de canviar de una manera semblant a el ROLE
  */
}
