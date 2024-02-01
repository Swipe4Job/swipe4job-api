import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';

export class UserRole extends StringValueObject {
  public static readonly ADMIN = new UserRole('ADMIN');
  public static readonly RECRUITER = new UserRole('RECRUITER');
  public static readonly CANDIDATE = new UserRole('CANDIDATE');
  private static readonly allowedValues = [
    UserRole.ADMIN,
    UserRole.RECRUITER,
    UserRole.CANDIDATE,
  ];

  protected constructor(value: string) {
    super(value);
  }

  public static from(value: string) {
    for (const allowedValue of UserRole.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid user role. Allowed values [${UserRole.allowedValues.join(
        ', ',
      )}]`,
    );
  }
}
