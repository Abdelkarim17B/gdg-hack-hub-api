import { IsNotEmpty, IsString, IsUUID, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SubmissionStatus } from '../entities/submission.entity';

export class SubmissionFieldDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;
}

export class CreateSubmissionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: [SubmissionFieldDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionFieldDto)
  fields: SubmissionFieldDto[];

  @ApiProperty()
  @IsUUID()
  teamId: string;

  @ApiProperty({ enum: SubmissionStatus })
  @IsEnum(SubmissionStatus)
  status: SubmissionStatus;
}