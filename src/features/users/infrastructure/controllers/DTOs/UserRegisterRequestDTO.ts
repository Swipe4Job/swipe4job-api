import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserRegisterRequestDTO {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  lastName!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  @IsOptional()
  password?: string;
}
