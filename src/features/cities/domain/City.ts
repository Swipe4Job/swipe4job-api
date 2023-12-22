import { CityName } from './CityName';
import { CityIneCode } from './CityIneCode';
import { ProvinceId } from '../../provinces/domain/ProvinceId';
import { CityId } from './CityId';

export class City {
  constructor(params: {
    id: CityId;
    name: CityName;
    coordinates: any;
    ineCode: CityIneCode;
    provinceId: ProvinceId;
  }) {
    this._id = params.id;
    this._name = params.name;
    this._coordinates = params.coordinates;
    this._ineCode = params.ineCode;
    this._provinceId = params.provinceId;
  }

  private _id: CityId;

  get id(): CityId {
    return this._id;
  }

  private _name: CityName;

  get name(): CityName {
    return this._name;
  }

  private _coordinates: any;

  get coordinates(): any {
    return this._coordinates;
  }

  private _ineCode: CityIneCode;

  get ineCode(): CityIneCode {
    return this._ineCode;
  }

  private _provinceId: ProvinceId;

  get provinceId(): ProvinceId {
    return this._provinceId;
  }

  withIneCode(ineCode: CityIneCode): City {
    this._ineCode = ineCode;
    return this;
  }

  withName(name: CityName): City {
    this._name = name;
    return this;
  }

  withCoordinates(coordinates: any): City {
    this._coordinates = coordinates;
    return this;
  }

  withProvinceId(provinceId: ProvinceId): City {
    this._provinceId = provinceId;
    return this;
  }

  withId(id: CityId): City {
    this._id = id;
    return this;
  }
}
