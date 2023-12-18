import { Controller, Get } from '@nestjs/common';
import { UnexpectedError } from '../../../../shared/domain/ApplicationError/UnexpectedError';

@Controller('users')
export class AuthUsersController {
  @Get('login')
  userLogin() {
    throw new UnexpectedError('TODO implement route');
  }
}
