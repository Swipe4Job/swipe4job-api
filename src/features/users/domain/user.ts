import { UserName } from './user-name';
import { UserId } from './user-id';
import { WalletAddress } from '../../../shared/domain/WalletAddress/WalletAddress';
import { UserEmail } from './user-email';
import { UserRole } from './user-role';

export class User {
  get role(): UserRole {
    return this._role;
  }
  get email(): UserEmail {
    return this._email;
  }
  get walletAddress(): WalletAddress {
    return this._walletAddress;
  }
  get id(): UserId {
    return this._id;
  }
  get name(): UserName {
    return this._name;
  }

  private _name: UserName;
  private _id: UserId;
  private _walletAddress: WalletAddress;
  private _email: UserEmail;
  private _role: UserRole;
  constructor(

  ) {
  }
}
