import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';

export class ContractType extends StringValueObject {
  public static readonly FREELANCE = new ContractType('FREELANCE');
  public static readonly INTERNSHIP = new ContractType('INTERNSHIP');
  public static readonly TEMPORARY = new ContractType('TEMPORARY');
  public static readonly INDEFINITE = new ContractType('INDEFINITE');
  public static readonly OTHER = new ContractType('OTHER');
  private static readonly allowedValues = [
    ContractType.FREELANCE,
    ContractType.INTERNSHIP,
    ContractType.TEMPORARY,
    ContractType.INDEFINITE,
    ContractType.OTHER,
  ];

  public static from(value: string) {
    for (const allowedValue of ContractType.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid contract type. Allowed values [${ContractType.allowedValues.join(
        ', ',
      )}]`,
    );
  }
}
