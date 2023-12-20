import { CityName } from './CityName';
import { CityIneCode } from './CityIneCode';

export class City {
  private _name: CityName;
  private _coordinates: any;
  private _ineCode: CityIneCode;

  constructor(params: {
    name: CityName;
    coordinates: any;
    ineCode: CityIneCode;
  }) {
    this._name = params.name;
    this._coordinates = params.coordinates;
    this._ineCode = params.ineCode;
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
}
