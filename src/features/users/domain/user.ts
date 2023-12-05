import {UserName} from './user-name';
import {UserId} from './user-id';
import {WalletAddress} from '../../../shared/domain/WalletAddress/WalletAddress';
import {UserEmail} from './user-email';
import {UserRole} from './user-role';
import {PhoneNumber} from "./phone-number";

export class User {
  constructor(params: {
    id: UserId;
    name: UserName;
    walletAddress: WalletAddress;
    email: UserEmail;
    role: UserRole;
    phoneNumber?: PhoneNumber;
  }) {
    this._id = params.id;
    this._name = params.name;
    this._walletAddress = params.walletAddress;
    this._email = params.email;
    this._role = params.role;
    this._phoneNumber = params.phoneNumber;
  }

  private _id: UserId;

  get id(): UserId {
    return this._id;
  }

  private _name: UserName;

  get name(): UserName {
    return this._name;
  }

  private _walletAddress?: WalletAddress;

  get walletAddress(): WalletAddress | undefined {
    return this._walletAddress;
  }

  private _email: UserEmail;

  get email(): UserEmail {
    return this._email;
  }

  private _role: UserRole;

  get role(): UserRole {
    return this._role;
  }

  private _phoneNumber?: PhoneNumber;

  get phoneNumber(): PhoneNumber | undefined {
    return this._phoneNumber;
  }

  withPhoneNumber(phoneNumber: PhoneNumber): User {
      this._phoneNumber = phoneNumber;
      return this;
  }
  
  withId(id: UserId): User {
      this._id = id;
      return this;
  }

  withName(name: UserName): User {
      this._name = name;
      return this;
  }

  withEmail(email: UserEmail): User {
      this._email = email;
      return this;
  }

  withWalletAddress(walletAddress: WalletAddress): User {
      this._walletAddress = walletAddress;
      return this;
  }

  withRole(role: UserRole): User {
      this._role = role;
      return this;
  }

}
