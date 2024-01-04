import { UserRepository } from '../domain/UserRepository/UserRepository';
import { Injectable } from '@nestjs/common';
import { UserAlreadyRegistered } from '../domain/UserAlreadyRegistered';
import { User } from '../domain/User';
import { UserId } from '../domain/UserID/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail/UserEmail';
import { PhoneNumber } from '../domain/PhoneNumber/PhoneNumber';
import { WalletAddress } from '../../../shared/domain/WalletAddress/WalletAddress';
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

@Injectable()
export class UserRegister {
  constructor(private userRepository: UserRepository) {}

  public async run(params: {
    name: string;
    email: string;
    walletAddress?: string;
    phoneNumber: string;
    password?: string;
  }) {
    const user = new User({
      id: UserId.random(),
      name: new UserName(params.name),
      email: new UserEmail(params.email),
      phoneNumber: new PhoneNumber(params.phoneNumber),
      walletAddress: params.walletAddress
        ? new WalletAddress(params.walletAddress)
        : undefined,
      role: UserRole.CUSTOMER,
      password: params.password
        ? await UserPassword.create(params.password)
        : undefined,
    });
    // Searching enabled users by id
    const criteria = new UserCriteria({
      filters: Filters.create([
        FilterGroup.create([
          Filter.create('email', Operators.EQUAL, user.email.value),
          Filter.create('disabled', Operators.EQUAL, false),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
    const users = await this.userRepository.search(criteria);
    if (users) {
      // Cannot register new user
      throw new UserAlreadyRegistered();
    }

    // Register new user
    await this.userRepository.save(user);
    // TODO Emit event
  }
}
