import { IsEthereumAddress, IsString } from 'class-validator';

export class UserWeb3LoginDTO {
  @IsString()
  @IsEthereumAddress()
  walletAddress!: string;
  @IsString()
  signature!: string;
}
