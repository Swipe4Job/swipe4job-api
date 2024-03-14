import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';

export class JobType extends StringValueObject {
  public static readonly ONSITE = new JobType('ONSITE');
  public static readonly REMOTELY = new JobType('REMOTELY');
  public static readonly HYBRID = new JobType('HYBRID');

  private static readonly allowedValues = [
    JobType.ONSITE,
    JobType.REMOTELY,
    JobType.HYBRID,
  ];

  public static from(value: string) {
    for (const allowedValue of JobType.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid job type. Allowed values [${JobType.allowedValues.join(', ')}]`,
    );
  }
}
