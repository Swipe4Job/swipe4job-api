import { Injectable } from '@nestjs/common';
import { UserRepository } from './UserRepository/UserRepository';
import { UserCriteria } from './UserRepository/UserCriteria';
import { User } from './User';
import { UserEmail } from './UserEmail/UserEmail';
import { ByUserEmail } from './UserEmail/ByUserEmail';
import { UserNotFound } from './UserRepository/UserNotFound';
import { InvalidUserCredentials } from './InvalidUserCredentials';
import { ApplicationLogger } from '../../../shared/infrastructure/services/application-logger/application-logger';

/**
 * UserContextService is a service to interact with user bounded context.
 *
 * It can be used outside user context and also inside UserContext to avoid
 * code duplication.
 *
 * In this case it only wraps simple methods. But in case that logs are required
 * or side effects can happen while interacting with user context this service will
 * be the single source of truth to interact.
 */
@Injectable()
export class UserContextService {
  // TODO this class seems to not respect Single Responsibility principle
  // In a future may this should be split
  constructor(
    private logger: ApplicationLogger,
    private userRepository: UserRepository,
  ) {}

  public async searchUsers(
    criteria: UserCriteria,
  ): Promise<User[] | undefined> {
    return this.userRepository.search(criteria);
  }

  public async findUsers(criteria: UserCriteria): Promise<User[]> {
    return this.userRepository.find(criteria);
  }

  public async validCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    // TODO check user credentials
    const userEmail = new UserEmail(email);
    const criteria = new ByUserEmail(userEmail);
    let users;
    try {
      users = await this.userRepository.find(criteria);
    } catch (err) {
      if (err instanceof UserNotFound) {
        throw new InvalidUserCredentials(`User with email ${email} not found`);
      }
      throw err;
    }
    const user = users[0];
    if (user.password && !(await user.password.match(password))) {
      throw new InvalidUserCredentials("Password don't match");
    }

    return user;
  }
}
