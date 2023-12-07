import { ValueObject } from './ValueObject';
import moment from 'moment';
import {InvalidArgument} from "../InvalidArgument";

export class DateTimeValueObject extends ValueObject<Date> {
  private _utc = false;
  constructor(value: Date) {
    super(value);
    if (!((value as any) instanceof Date)) {
      throw new InvalidArgument(`Provided value must be a Date object not a ${value.constructor.name}`);
    }
  }

  public static fromTime(time: number): DateTimeValueObject {
    const date = new Date(time);
    return new DateTimeValueObject(date);
  }

  public static now() {
    return new DateTimeValueObject(new Date());
  }

  public utc(): DateTimeValueObject {
    const newDate = DateTimeValueObject.fromTime(this.value.getTime());
    newDate._utc = true;
    return newDate;
  }

  public format(format: string): string {
    let mom = moment(this.value);
    if (this._utc) {
      mom = mom.utc();
    }

    return mom.format(format);
  }
}
