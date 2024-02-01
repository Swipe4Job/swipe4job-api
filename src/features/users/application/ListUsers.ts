import { UserRepository } from '../domain/UserRepository/UserRepository';
import { UserCriteria } from '../domain/UserRepository/UserCriteria';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUsers {
  constructor(private userRepository: UserRepository) {}
  public async run(criteria: UserCriteria) {
    // TODO use case should verify permissions of requesting user
    const users = await this.userRepository.search(criteria);
    return users || [];
  }
}
