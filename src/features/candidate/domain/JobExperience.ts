import { Serializer } from '../../../shared/domain/Serializer';

export class JobExperience implements Serializer {
  constructor(params: {
    position: string;
    company: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
  }) {
    this._position = params.position;
    this._company = params.company;
    this._description = params.description || '';
    this._startDate = params.startDate;
    this._endDate = params.endDate;
  }

  private _position: string;

  get position(): string {
    return this._position;
  }

  set position(value: string) {
    this._position = value;
  }

  private _company: string;

  get company(): string {
    return this._company;
  }

  set company(value: string) {
    this._company = value;
  }

  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  private _startDate: Date;

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  private _endDate?: Date;

  get endDate(): Date | undefined {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  public static formJSON(json: any) {
    return new JobExperience({
      position: json.position,
      description: json.description,
      company: json.company,
      startDate: new Date(json.startDate),
      endDate: json.endDate ? new Date(json.endDate) : undefined,
    });
  }

  serialize() {
    return {
      position: this.position,
      description: this.description,
      company: this.company,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate?.toISOString(),
    };
  }
}
