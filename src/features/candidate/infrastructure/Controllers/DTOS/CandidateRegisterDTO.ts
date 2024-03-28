import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CandidateRegisterDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  candidateId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  studies!: Array<string>;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  softSkills!: Set<string>;

  @ApiProperty()
  @IsOptional()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  languages!: Array<string>;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobExperiences!: Array<string>;
}
