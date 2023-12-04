import { UserName } from './user-name';
import { UserId } from './user-id';
import { WalletAddress } from '../../../shared/domain/WalletAddress/WalletAddress';
import { UserEmail } from './user-email';
import { UserRole } from './user-role';

export class User {
  private _id: UserId;
  private _name: UserName;
  private _walletAddress: WalletAddress;
  private _email: UserEmail;
  private _role: UserRole;
  constructor(params: {
    id: UserId;
    name: UserName;
    walletAddress: WalletAddress;
    email: UserEmail;
    role: UserRole;
  }) {
    this._id = params.id;
    this._name = params.name;
    this._walletAddress = params.walletAddress;
    this._email = params.email;
    this._role = params.role;
  }

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
}
