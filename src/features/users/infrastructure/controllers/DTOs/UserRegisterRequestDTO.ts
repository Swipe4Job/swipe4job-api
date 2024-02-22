import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserRegisterRequestDTO {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  lastName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role!: string;

  @ApiProperty()
  @IsString()
  phoneNumber!: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  password?: string;
}
