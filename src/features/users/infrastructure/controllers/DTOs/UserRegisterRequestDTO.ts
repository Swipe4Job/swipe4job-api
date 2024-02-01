import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserRegisterRequestDTO {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  @IsOptional()
  password?: string;
}
