import {
  IsEthereumAddress,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class ReqNewTransactionDTO {
  @IsUUID(4)
  @IsOptional()
  id?: string;
  @IsEthereumAddress()
  destinationWallet!: string;
  @IsPositive()
  tokens!: number;
}
