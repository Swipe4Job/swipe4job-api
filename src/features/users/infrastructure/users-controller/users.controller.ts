import { Controller, Get } from '@nestjs/common';
import { UserRepository } from '../../domain/UserRepository/UserRepository';
import { ListUsers } from '../../application/ListUsers';
import { UserCriteria } from '../../domain/UserRepository/UserCriteria';
import { HttpResponse } from '../../../../shared/infrastructure/HttpResponse';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UserRepository) {}
  @Get()
  async getUsers() {
    const users = await ListUsers.run(this.userRepository, UserCriteria.NONE());
    return HttpResponse.success('Users fetched successfullly').withData(users);
  }
}
