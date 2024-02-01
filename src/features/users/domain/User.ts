import { UserName } from './UserName';
import { UserId } from './UserID/UserId';
import { UserEmail } from './UserEmail/UserEmail';
import { UserRole } from './UserRole';
import { PhoneNumber } from './PhoneNumber/PhoneNumber';
import { UserPassword } from './UserPassword';
import { Serializer } from '../../../shared/domain/Serializer';
import { UserLastName } from './UserLastName';

export class User implements Serializer {
  serialize() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      role: this.role.value,
      password: this.password?.value,
      phoneNumber: this.phoneNumber.value,
      lastName: this.userLastName.value,
    };
  }
  constructor(params: {
    id: UserId;
    name: UserName;
    email: UserEmail;
    lastName: UserLastName;
    role: UserRole;
    phoneNumber: PhoneNumber;
    password?: UserPassword;
  }) {
    this._id = params.id;
    this._name = params.name;
    this._email = params.email;
    this._role = params.role;
    this._phoneNumber = params.phoneNumber;
    this._password = params.password;
    this._userLastName = params.lastName;
  }

  private _userLastName: UserLastName;

  withUserLastName(lastName: UserLastName) {
    this._userLastName = lastName;
    return this;
  }

  get userLastName(): UserLastName {
    return this._userLastName;
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

  withRole(role: UserRole): User {
    this._role = role;
    return this;
  }

  public isAdmin(): boolean {
    return this.role.equals(UserRole.ADMIN);
  }
}
