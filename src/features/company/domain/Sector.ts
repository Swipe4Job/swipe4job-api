import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';

export class Sector extends StringValueObject {
  public static readonly ADMINAUX = new Sector('ADMINAUX');
  public static readonly AGRICULTURE = new Sector('AGRICULTURE');
  public static readonly ARTISTIC = new Sector('ARTISTIC');
  public static readonly COMMERCE = new Sector('COMMERCE');
  public static readonly CONSTRUCTION = new Sector('CONSTRUCTION');
  public static readonly CONSUMERGOODS = new Sector('CONSUMERGOODS');
  public static readonly ECOMMERCE = new Sector('ECOMMERCE');
  public static readonly EDUCATION = new Sector('EDUCATION');
  public static readonly ENERGYENVIROMENT = new Sector('ENERGYENVIROMENT');
  public static readonly ENERGYSUPPLY = new Sector('ENERGYSUPPLY');
  public static readonly FINANCEINSURANCE = new Sector('FINANCEINSURANCE');
  public static readonly HOTEL = new Sector('HOTEL');
  public static readonly INFO_TECHNO = new Sector('INFO_TECHNO');
  public static readonly INTERNET = new Sector('INTERNET');
  public static readonly MANUFACTURING = new Sector('MANUFACTURING');
  public static readonly PRO_SCIENTIFIC = new Sector('PRO_SCIENTIFIC');
  public static readonly SPORTS = new Sector('SPORTS');
  public static readonly TRANSPORT_STORAGE = new Sector('TRANSPORT_STORAGE');
  public static readonly REALESTATE = new Sector('REALESTATE');

  private static readonly allowedValues = [
    Sector.ADMINAUX,
    Sector.AGRICULTURE,
    Sector.COMMERCE,
    Sector.ARTISTIC,
    Sector.CONSTRUCTION,
    Sector.CONSUMERGOODS,
    Sector.ECOMMERCE,
    Sector.EDUCATION,
    Sector.ENERGYENVIROMENT,
    Sector.ENERGYSUPPLY,
    Sector.FINANCEINSURANCE,
    Sector.HOTEL,
    Sector.INFO_TECHNO,
    Sector.INTERNET,
    Sector.MANUFACTURING,
    Sector.PRO_SCIENTIFIC,
    Sector.SPORTS,
    Sector.TRANSPORT_STORAGE,
    Sector.REALESTATE,
  ];
  protected constructor(value: string) {
    super(value);
  }
  public static from(value: string) {
    for (const allowedValue of Sector.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid sector. Allowed values [${Sector.allowedValues.join(', ')}]`,
    );
  }
}
