import { Injectable } from '@nestjs/common';
import { UserRepository } from './UserRepository/UserRepository';
import { UserCriteria } from './UserRepository/UserCriteria';
import { User } from './User';

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
  constructor(private userRepository: UserRepository) {}

  public async searchUsers(
    criteria: UserCriteria,
  ): Promise<User[] | undefined> {
    return this.userRepository.search(criteria);
  }
}
