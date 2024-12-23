import { IsOptional, IsUUID, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryEvaluationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  submissionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  judgeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';
}