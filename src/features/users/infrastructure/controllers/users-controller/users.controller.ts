import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from '../../../domain/UserRepository/UserRepository';
import { ListUsers } from '../../../application/ListUsers';
import { UserCriteria } from '../../../domain/UserRepository/UserCriteria';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';
import { UserRegisterRequestDTO } from '../DTOs/UserRegisterRequestDTO';
import { UserRegister } from '../../../application/UserRegister';
import { UsersListResponseDTO } from '../DTOs/UsersListResponseDTO';

@Controller('users')
export class UsersController {
  constructor(
    private userRepository: UserRepository,
    private userRegister: UserRegister,
  ) {}
  @Get()
  async getUsers() {
    const users = await ListUsers.run(this.userRepository, UserCriteria.NONE());
    return HttpResponse.success('Users fetched successfully').withData(
      users.map((user) => new UsersListResponseDTO(user)),
    );
  }

  @Post('register')
  async registerUser(@Body() body: UserRegisterRequestDTO) {
    await this.userRegister.run(body);
    return HttpResponse.success('User registered successfully');
  }
}
