import { UserRepository } from '../domain/UserRepository/UserRepository';
import { UserCriteria } from '../domain/UserRepository/UserCriteria';

export class ListUsers {
  public static async run(userRepository: UserRepository, criteria: UserCriteria) {
    // TODO use case should verify permissions of requesting user
    const users = await userRepository.search(criteria);
    return users || [];
  }
}