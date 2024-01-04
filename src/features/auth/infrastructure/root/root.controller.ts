import { Body, Controller, Post } from '@nestjs/common';
import { VerifyAuthTokenRequestDTO } from './DTOs/VerifyAuthTokenRequestDTO';
import { VerifyAuthToken } from '../../application/VerifyAuthToken';
import { HttpResponse } from '../../../../shared/infrastructure/HttpResponse';

@Controller()
export class RootController {
  constructor(private verifyAuthTokenUseCase: VerifyAuthToken) {}
  @Post('verify')
  async verifyAuthToken(
    @Body() { jwt }: VerifyAuthTokenRequestDTO,
  ): Promise<HttpResponse> {
    const authTokenPayload = await this.verifyAuthTokenUseCase.run(jwt);
    return HttpResponse.success('Token verified').withData(authTokenPayload);
  }
}
