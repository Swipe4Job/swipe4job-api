import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';

export class WorkingDay extends StringValueObject {
  public static readonly FULL_TIME = new WorkingDay('FULL_TIME');
  public static readonly PART_TIME = new WorkingDay('PART_TIME');
  public static readonly FLEXIBLE = new WorkingDay('FLEXIBLE');

  private static readonly allowedValues = [
    WorkingDay.FULL_TIME,
    WorkingDay.PART_TIME,
    WorkingDay.FLEXIBLE,
  ];

  public static from(value: string) {
    for (const allowedValue of WorkingDay.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid working day. Allowed values [${WorkingDay.allowedValues
        .map((w) => w.value)
        .join(', ')}]`,
    );
  }
}
