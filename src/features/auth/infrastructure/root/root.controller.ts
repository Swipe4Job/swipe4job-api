import { Body, Controller, Post } from '@nestjs/common';
import { VerifyAuthTokenRequestDTO } from './DTOs/VerifyAuthTokenRequestDTO';
import { VerifyAuthToken } from '../../application/VerifyAuthToken';
import { pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import { HttpResponse } from '../../../../shared/infrastructure/HttpResponse';

@Controller()
export class RootController {
  constructor(private verifyAuthTokenUseCase: VerifyAuthToken) {}
  @Post('verify')
  async verifyAuthToken(
    @Body() { jwt }: VerifyAuthTokenRequestDTO,
  ): Promise<HttpResponse> {
    const result = await this.verifyAuthTokenUseCase.run(jwt);
    return pipe(
      result,
      Either.match(
        (error) => {
          throw error;
        },
        (value) => {
          return HttpResponse.success('Token verified').withData(value);
        },
      ),
    );
  }
}
