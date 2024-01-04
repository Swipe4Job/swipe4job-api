import { Web3LoginRequestId } from './Web3LoginRequestId';
import { Serializer } from '../../../../shared/domain/Serializer';
import { WalletAddress } from '../../../../shared/domain/WalletAddress/WalletAddress';
import { SignCode } from './SignCode';

export class Web3LoginRequest implements Serializer {
  constructor({
    walletAddress,
    signCode,
  }: {
    walletAddress: WalletAddress;
    signCode: SignCode;
  }) {
    this._id = Web3LoginRequestId.random();
    this._walletAddress = walletAddress;
    this._signCode = signCode;
  }

  private _id: Web3LoginRequestId;

  get id(): Web3LoginRequestId {
    return this._id;
  }

  private _walletAddress: WalletAddress;

  get walletAddress(): WalletAddress {
    return this._walletAddress;
  }

  private _signCode: SignCode;

  get signCode(): SignCode {
    return this._signCode;
  }

  withId(id: Web3LoginRequestId): Web3LoginRequest {
    this._id = id;
    return this;
  }

  withWalletAddress(walletAddress: WalletAddress): Web3LoginRequest {
    this._walletAddress = walletAddress;
    return this;
  }

  withSignCode(signCode: SignCode): Web3LoginRequest {
    this._signCode = signCode;
    return this;
  }

  serialize() {
    return {
      id: this.id.value,
      walletAddress: this.walletAddress.value,
      signCode: this.signCode.value,
    };
  }
}
