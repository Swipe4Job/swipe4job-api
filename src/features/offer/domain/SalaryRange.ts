import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';

export class SalaryRange extends StringValueObject {
  public static readonly LOWER_THAN_15 = new SalaryRange('LOWER_THAN_15');
  public static readonly BETWEEN_15_20 = new SalaryRange('BETWEEN_15_20');
  public static readonly BETWEEN_20_25 = new SalaryRange('BETWEEN_20_25');
  public static readonly BETWEEN_25_35 = new SalaryRange('BETWEEN_25_35');
  public static readonly BETWEEN_35_45 = new SalaryRange('BETWEEN_35_45');
  public static readonly BETWEEN_45_55 = new SalaryRange('BETWEEN_45_55');
  public static readonly BETWEEN_55_65 = new SalaryRange('BETWEEN_55_65');
  public static readonly GREATER_THAN_65 = new SalaryRange('GREATER_THAN_65');

  private static readonly allowedValues = [
    SalaryRange.LOWER_THAN_15,
    SalaryRange.BETWEEN_15_20,
    SalaryRange.BETWEEN_20_25,
    SalaryRange.BETWEEN_25_35,
    SalaryRange.BETWEEN_35_45,
    SalaryRange.BETWEEN_45_55,
    SalaryRange.BETWEEN_55_65,
    SalaryRange.GREATER_THAN_65,
  ];

  protected constructor(value: string) {
    super(value);
  }

  public static from(value: string) {
    for (const allowedValue of SalaryRange.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid salary range. Allowed values [${SalaryRange.allowedValues.join(
        ', ',
      )}]`,
    );
  }
}
