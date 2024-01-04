import { IsEthereumAddress } from 'class-validator';

export class UserWeb3GetSignCodeDTO {
  @IsEthereumAddress()
  walletAddress!: string;
}
