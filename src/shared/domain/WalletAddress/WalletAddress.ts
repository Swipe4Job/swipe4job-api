import { StringValueObject } from '../ValueObject/StringValueObject';
import { InvalidWalletAddress } from './InvalidWalletAddress';

export class WalletAddress extends StringValueObject {
  private eth = /^(0x)[0-9a-f]{40}$/i;
  constructor(value: string) {
    super(value);
    if (!this.eth.test(value)) {
      throw new InvalidWalletAddress();
    }
  }
}
