import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRefreshRequestDTO {
  @IsJWT()
  @ApiProperty({ required: true, type: 'string' })
  token!: string;
}
