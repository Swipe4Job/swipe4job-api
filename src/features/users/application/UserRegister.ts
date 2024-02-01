import { UserRepository } from '../domain/UserRepository/UserRepository';
import { Injectable } from '@nestjs/common';
import { UserAlreadyRegistered } from '../domain/UserAlreadyRegistered';
import { User } from '../domain/User';
import { UserId } from '../domain/UserID/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail/UserEmail';
import { PhoneNumber } from '../domain/PhoneNumber/PhoneNumber';
import { UserRole } from '../domain/UserRole';
import { UserPassword } from '../domain/UserPassword';
import { UserCriteria } from '../domain/UserRepository/UserCriteria';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';
import { UserLastName } from '../domain/UserLastName';
import { ByUserEmail } from "../domain/UserEmail/ByUserEmail";

@Injectable()
export class UserRegister {
  constructor(private userRepository: UserRepository) {}

  public async run(params: {
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    password?: string;
  }) {
    const user = new User({
      id: UserId.random(),
      lastName: new UserLastName(params.lastName),
      name: new UserName(params.name),
      email: new UserEmail(params.email),
      phoneNumber: new PhoneNumber(params.phoneNumber),
      role: UserRole.CUSTOMER,
      password: params.password
        ? await UserPassword.create(params.password)
        : undefined,
    });
    // Searching enabled users by id
    const users = await this.userRepository.search(new ByUserEmail(user.email));
    if (users) {
      // Cannot register new user
      throw new UserAlreadyRegistered();
    }

    // Register new user
    await this.userRepository.save(user);
    // TODO Emit event
  }
}
