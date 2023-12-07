import { UUIDValueObject } from '../../../shared/domain/ValueObject/UUIDValueObject';
import {InvalidArgument} from "../../../shared/domain/InvalidArgument";

export class TransactionID extends UUIDValueObject {
  constructor(value: string) {
    try {
      super(value);
    } catch (error) {
      if (error instanceof InvalidArgument) {
        throw new InvalidArgument('Invalid transaction ID it must be an UUID');
      }
    }
  }
}
