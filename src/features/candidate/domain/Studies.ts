import { Serializer } from '../../../shared/domain/Serializer';

export class Study implements Serializer {
  private _name: string;
  private _school: string;
  private _startDate: Date;
  private _endDate?: Date;

  constructor(params: {
    name: string;
    school: string;
    startDate: Date;
    endDate?: Date;
  }) {
    this._name = params.name;
    this._school = params.school;
    this._startDate = params.startDate;
    this._endDate = params.endDate;
  }

  get name(): string {
    return this._name;
  }

  withName(value: string) {
    this._name = value;
    return this;
  }

  get school(): string {
    return this._school;
  }

  withSchool(value: string) {
    this._school = value;
    return this;
  }

  get startDate(): Date {
    return this._startDate;
  }

  withStartDate(value: Date) {
    this._startDate = value;
    return this;
  }

  get endDate(): Date | undefined {
    return this._endDate;
  }

  withEndDate(value: Date) {
    this._endDate = value;
    return this;
  }

  serialize() {
    return {
      name: this.name,
      school: this.school,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate?.toISOString(),
    };
  }

  public static fromJSONString(json: any): Study {
    return new Study({
      name: json.name,
      school: json.school,
      startDate: new Date(json.startDate),
      endDate: json.endDate ? new Date(json.endDate) : undefined,
    });
  }
}
