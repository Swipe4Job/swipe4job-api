import { StringValueObject } from './StringValueObject';
import { v4 as uuidv4 } from 'uuid';

export class UUIDValueObject extends StringValueObject {
  private UUIDRegex =
    /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;
  constructor(value: string) {
    super(value);
    if (!this.UUIDRegex.test(value)) {
      throw new Error('Invalid UUID');
    }
  }

  public static random(): UUIDValueObject {
    return new UUIDValueObject(uuidv4());
  }
}
