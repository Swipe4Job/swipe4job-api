import { Body, Controller, Get } from '@nestjs/common';
import { UserLogin } from '../../application/users/UserLogin';
import { UserLoginRequestDTO } from './DTOs/UserLoginRequestDTO';
import { pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import { JWTService } from '../../domain/JWTService';
import { HttpResponse } from '../../../../shared/infrastructure/HttpResponse';

@Controller('users')
export class AuthUsersController {
  constructor(
    private userLoginUseCase: UserLogin,
    private jwtService: JWTService,
  ) {}
  @Get('login')
  async userLogin(@Body() { email, password }: UserLoginRequestDTO) {
    const result = await this.userLoginUseCase.web2(email, password);
    const { refresh, access } = pipe(
      result,
      Either.match(
        (err) => {
          throw err;
        },
        (tokens) => tokens,
      ),
    );

    const signedRefreshToken = await this.jwtService.sign(refresh);
    const signedAccessToken = await this.jwtService.sign(access);

    return HttpResponse.success('Logged in successfully').withData({
      accessToken: signedAccessToken,
      refreshToken: signedRefreshToken,
    });
  }
}
