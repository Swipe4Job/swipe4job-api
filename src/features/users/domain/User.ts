import { UserName } from './UserName';
import { UserId } from './UserID/UserId';
import { WalletAddress } from '../../../shared/domain/WalletAddress/WalletAddress';
import { UserEmail } from './UserEmail/UserEmail';
import { UserRole } from './UserRole';
import { PhoneNumber } from './PhoneNumber/PhoneNumber';
import { UserPassword } from './UserPassword';

export class User {
  constructor(params: {
    id: UserId;
    name: UserName;
    walletAddress?: WalletAddress;
    email: UserEmail;
    role: UserRole;
    phoneNumber: PhoneNumber;
    password?: UserPassword;
    enabled?: boolean;
  }) {
    this._id = params.id;
    this._name = params.name;
    this._walletAddress = params.walletAddress;
    this._email = params.email;
    this._role = params.role;
    this._phoneNumber = params.phoneNumber;
    this._password = params.password;
    this._enabled = params.enabled || true;
  }

  private _enabled: boolean;

  public enable() {
    this._enabled = true;
  }

  public disable() {
    this._enabled = false;
  }

  public get enabled(): boolean {
    return this._enabled;
  }

  private _password?: UserPassword;

  get password(): UserPassword | undefined {
    return this._password;
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

  private _phoneNumber: PhoneNumber;

  get phoneNumber(): PhoneNumber {
    return this._phoneNumber;
  }

  withPassword(password: UserPassword): User {
    this._password = password;
    return this;
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

  public isAdmin(): boolean {
    return this.role.equals(UserRole.ADMIN);
  }
}
