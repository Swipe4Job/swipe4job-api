import { UserRepository } from '../domain/UserRepository/UserRepository';
import { Injectable } from '@nestjs/common';
import { UserAlreadyRegistered } from '../domain/UserAlreadyRegistered';
import { User } from '../domain/User';
import { ByUserEmail } from '../domain/UserEmail/ByUserEmail';
import { InvalidUserCredentials } from '../domain/InvalidUserCredentials';

@Injectable()
export class UserRegister {
  constructor(private userRepository: UserRepository) {}

  public async run(params: {
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    role: string;
    password?: string;
  }) {
    const user = await User.create(params);

    if (user.isAdmin()) {
      throw new InvalidUserCredentials('Admin cannot be created');
    }

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
