import { IsJWT } from 'class-validator';

export class UserLogoutRequestDTO {
  @IsJWT()
  token!: string;
}
