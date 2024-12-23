import { IsNotEmpty, IsString, IsDate, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { HackathonStatus } from '../entities/hackathon.entity';

export class CreateHackathonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  registrationDeadline: Date;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  maxParticipants: number;

  @ApiProperty({ enum: HackathonStatus })
  @IsEnum(HackathonStatus)
  status: HackathonStatus;

  @ApiProperty()
  @IsString()
  rules: string;

  @ApiProperty()
  @IsString()
  prizes: string;
}