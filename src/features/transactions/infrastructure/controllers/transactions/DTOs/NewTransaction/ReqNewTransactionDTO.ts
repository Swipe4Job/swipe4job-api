import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class ReqNewTransactionDTO {
  @IsUUID(4)
  @IsOptional()
  id?: string;
  @IsNumber()
  sensorId!: number;
  @IsPositive()
  tokens!: number;
}
