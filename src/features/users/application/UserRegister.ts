import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository/UserRepository';
import { Injectable } from '@nestjs/common';
import { ByUserID } from '../domain/UserID/ByUserID';
import { UserAlreadyRegistered } from '../domain/UserAlreadyRegistered';

@Injectable()
export class UserRegister {
  constructor(private userRepository: UserRepository) {}
  public async run(user: User) {
    const users = await this.userRepository.search(new ByUserID(user.id));
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
