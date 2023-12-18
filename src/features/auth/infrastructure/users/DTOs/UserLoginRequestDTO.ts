import { IsString } from 'class-validator';

export class UserLoginRequestDTO {
  @IsString()
  email!: string;
  @IsString()
  password!: string;
}
