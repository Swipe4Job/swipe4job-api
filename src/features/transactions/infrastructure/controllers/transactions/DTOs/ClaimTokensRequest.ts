import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimTokensRequest {
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  sensorId!: number;
}
