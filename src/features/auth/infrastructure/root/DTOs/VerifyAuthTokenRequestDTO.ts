import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyAuthTokenRequestDTO {
  @IsJWT()
  @ApiProperty()
  jwt!: string;
}
