import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';

export class CompanySize extends StringValueObject {
  public static readonly LESS_10 = new CompanySize('LESS_10');
  public static readonly BETWEEN_10_49 = new CompanySize('BETWEEN_10_49');
  public static readonly BETWEEN_50_249 = new CompanySize('BETWEEN_50_249');
  public static readonly MORE_250 = new CompanySize('MORE_250');
  private static readonly allowedValues = [
    CompanySize.LESS_10,
    CompanySize.BETWEEN_10_49,
    CompanySize.BETWEEN_50_249,
    CompanySize.MORE_250,
  ];
  protected constructor(value: string) {
    super(value);
  }
  public static from(value: string) {
    for (const allowedValue of CompanySize.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid company size. Allowed values [${CompanySize.allowedValues.join(
        ', ',
      )}]`,
    );
  }
}
