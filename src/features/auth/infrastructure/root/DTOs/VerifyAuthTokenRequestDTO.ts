import { IsJWT } from 'class-validator';

export class VerifyAuthTokenRequestDTO {
  @IsJWT()
  jwt!: string;
}
