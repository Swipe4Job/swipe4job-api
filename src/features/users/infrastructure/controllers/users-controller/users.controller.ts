import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserRepository } from '../../../domain/UserRepository/UserRepository';
import { ListUsers } from '../../../application/ListUsers';
import { UserCriteria } from '../../../domain/UserRepository/UserCriteria';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';
import { UserRegisterRequestDTO } from '../DTOs/UserRegisterRequestDTO';
import { UserRegister } from '../../../application/UserRegister';
import { ListUserResponseDTO } from '../DTOs/ListUserResponseDTO';
import { CriteriaCodec } from '../../../../../shared/infrastructure/services/criteria-codec/CriteriaCodec';
import { AuthTokenGuard } from '../../../../auth/infrastructure/auth-token/auth-token.guard';
import { InjectAuthToken } from '../../../../auth/infrastructure/auth-token/auth-token.decorator';
import { AuthTokenPayload } from '../../../../auth/domain/AuthToken';
import { UserAuthToken } from '../../../../auth/domain/users/UserAuthToken';
import { ByUserID } from '../../../domain/UserID/ByUserID';
import { UserId } from '../../../domain/UserID/UserId';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private userRepository: UserRepository,
    private userRegister: UserRegister,
    private criteriaCodec: CriteriaCodec,
    private listUsers: ListUsers,
  ) {}

  @Get()
  async getUsers(@Query('criteria') encodedCriteria: string) {
    const userCriteria = encodedCriteria
      ? UserCriteria.fromCriteria(this.criteriaCodec.decode(encodedCriteria))
      : UserCriteria.NONE();
    const users = await this.listUsers.run(userCriteria);
    return HttpResponse.success('Users fetched successfully').withData(
      users.map((user) => new ListUserResponseDTO(user)),
    );
  }

  @Post('register')
  async registerUser(@Body() body: UserRegisterRequestDTO) {
    await this.userRegister.run(body);
    return HttpResponse.success('User registered successfully');
  }

  @UseGuards(AuthTokenGuard)
  @Get('me')
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(ListUserResponseDTO),
    },
  })
  @ApiExtraModels(ListUserResponseDTO)
  async getMyInformation(
    @InjectAuthToken() authTokenPayload: AuthTokenPayload<unknown>,
  ) {
    const userAuthToken = UserAuthToken.from(authTokenPayload);

    const [user] = await this.userRepository.find(
      new ByUserID(new UserId(userAuthToken.payload.data.userID)),
    );

    return HttpResponse.success("T'hem trobat!").withData(
      new ListUserResponseDTO(user),
    );
  }
}
