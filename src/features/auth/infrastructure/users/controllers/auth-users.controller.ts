import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UserLogin } from '../../../application/users/UserLogin';
import { UserLoginRequestDTO } from './DTOs/UserLoginRequestDTO';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';
import { UserLogoutRequestDTO } from './DTOs/UserLogoutRequestDTO';
import { UserLogout } from '../../../application/users/UserLogout';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('users')
export class AuthUsersController {
  constructor(
    private userLoginUseCase: UserLogin,
    private userLogoutUseCase: UserLogout,
  ) {}

  @Post('login')
  async userLogin(@Body() { email, password }: UserLoginRequestDTO) {
    const { access } = await this.userLoginUseCase.web2(email, password);
    return HttpResponse.success('Logged in successfully').withData({
      accessToken: access,
    });
  }

  @Delete('logout')
  async userLogout(@Body() { token }: UserLogoutRequestDTO) {
    await this.userLogoutUseCase.run(token);
    return HttpResponse.success('Logged out successfully');
  }

  @Post('sign-up')
  async userSignUp() {
    return HttpResponse.success('Hello world!');
  }
}
