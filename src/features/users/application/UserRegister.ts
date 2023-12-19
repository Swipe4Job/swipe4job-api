import { UserRepository } from '../domain/UserRepository/UserRepository';
import { Injectable } from '@nestjs/common';
import { UserAlreadyRegistered } from '../domain/UserAlreadyRegistered';
import { UserCriteria } from '../domain/UserRepository/UserCriteria';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { Filters, Operators } from '@zertifier/criteria/dist/Filters';
import {
  Field,
  Filter,
  FilterGroup,
  Operand,
  Operator,
} from '@zertifier/criteria';
import { User } from '../domain/User';
import { UserId } from '../domain/UserID/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail/UserEmail';
import { PhoneNumber } from '../domain/PhoneNumber/PhoneNumber';
import { WalletAddress } from '../../../shared/domain/WalletAddress/WalletAddress';
import { UserRole } from '../domain/UserRole';
import { UserPassword } from '../domain/UserPassword';

@Injectable()
export class UserRegister {
  constructor(private userRepository: UserRepository) {}

  public async run(params: {
    name: string;
    email: string;
    walletAddress?: string;
    id: string;
    phoneNumber: string;
    password?: string;
  }) {
    const user = new User({
      id: new UserId(params.id),
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
    // Searching users by email or id
    const users = await this.userRepository.search(
      new UserCriteria({
        filters: new Filters([
          FilterGroup.create([
            new Filter(
              new Field('id'),
              Operator.from(Operators.EQUAL),
              new Operand(user.id.value),
            ),
          ]),
          FilterGroup.create([
            new Filter(
              new Field('email'),
              Operator.from(Operators.EQUAL),
              new Operand(user.email.value),
            ),
          ]),
        ]),
        orders: Orders.EMPTY(),
      }),
    );
    // TODO check if client has permissions
    if (users) {
      // Cannot register new user
      throw new UserAlreadyRegistered();
    }

    // Register new user
    await this.userRepository.save(user);
    // TODO Emit event
  }
}
