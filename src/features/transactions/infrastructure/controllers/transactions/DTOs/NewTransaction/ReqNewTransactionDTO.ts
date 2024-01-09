import { IsOptional, IsPositive, IsUUID } from 'class-validator';

export class ReqNewTransactionDTO {
  @IsUUID(4)
  @IsOptional()
  id?: string;
  @IsUUID(4)
  sensorId!: string;
  @IsPositive()
  tokens!: number;
}
