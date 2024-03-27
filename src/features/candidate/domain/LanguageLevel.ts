import { NonEmptyStringValueObject } from '../../../shared/domain/ValueObject/NonEmptyStringValueObject';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';

export class LanguageLevel extends NonEmptyStringValueObject {
  public static readonly LOW = new LanguageLevel('LOW');
  public static readonly INTERMEDIATE = new LanguageLevel('INTERMEDIATE');
  public static readonly ADVANCED = new LanguageLevel('ADVANCED');
  public static readonly NATIVE = new LanguageLevel('NATIVE');
  private static readonly allowedValues: LanguageLevel[] = [
    LanguageLevel.LOW,
    LanguageLevel.INTERMEDIATE,
    LanguageLevel.ADVANCED,
    LanguageLevel.NATIVE,
  ];

  public static from(value: string) {
    for (const allowedValue of LanguageLevel.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid language level. Allowed values [${LanguageLevel.allowedValues.join(
        ', ',
      )}]`,
    );
  }
}
