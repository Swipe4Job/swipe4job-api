import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserRepository } from '../../../domain/UserRepository/UserRepository';
import { ListUsers } from '../../../application/ListUsers';
import { UserCriteria } from '../../../domain/UserRepository/UserCriteria';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';
import { UserRegisterRequestDTO } from '../DTOs/UserRegisterRequestDTO';
import { UserRegister } from '../../../application/UserRegister';
import { UsersListResponseDTO } from '../DTOs/UsersListResponseDTO';
import { CriteriaCodec } from '../../../../../shared/infrastructure/services/criteria-codec/CriteriaCodec';

@Controller('users')
export class UsersController {
  constructor(
    private userRepository: UserRepository,
    private userRegister: UserRegister,
    private criteriaCodec: CriteriaCodec,
  ) {}
  @Get()
  async getUsers(@Query('criteria') encodedCriteria: string) {
    const userCriteria = encodedCriteria
      ? UserCriteria.fromCriteria(this.criteriaCodec.decode(encodedCriteria))
      : UserCriteria.NONE();
    const users = await ListUsers.run(this.userRepository, userCriteria);
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
