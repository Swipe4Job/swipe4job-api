import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class UserLogoutRequestDTO {
  @ApiProperty()
  @IsJWT()
  token!: string;
}
