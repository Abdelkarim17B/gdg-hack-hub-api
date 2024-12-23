import { IsOptional, IsEnum, IsUUID, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SubmissionStatus } from '../entities/submission.entity';

export class QuerySubmissionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  hackathonId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  participantId?: string;

  @ApiPropertyOptional({ enum: SubmissionStatus })
  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID() // Assuming teamId is a UUID. Change validation type if needed.
  teamId?: string;
}
