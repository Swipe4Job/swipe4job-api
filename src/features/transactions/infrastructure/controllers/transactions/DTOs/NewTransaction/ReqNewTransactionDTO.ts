import { IsOptional, IsPositive, IsUUID } from 'class-validator';

export class ReqNewTransactionDTO {
  @IsUUID(4)
  @IsOptional()
  id?: string;
  @IsUUID()
  sensorId!: string;
  @IsPositive()
  tokens!: number;
}
