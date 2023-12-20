import {
  IsEmail,
  IsEthereumAddress,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserRegisterRequestDTO {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsEthereumAddress()
  @IsOptional()
  walletAddress?: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  @IsOptional()
  password?: string;
}
