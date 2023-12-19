import {
  IsEmail,
  IsEthereumAddress,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserRegisterRequestDTO {
  @IsUUID()
  id!: string;

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
