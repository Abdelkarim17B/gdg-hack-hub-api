import { IsNotEmpty, IsUUID, IsNumber, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEvaluationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  submissionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  criteriaId: string;

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  score: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  feedback: string;
}