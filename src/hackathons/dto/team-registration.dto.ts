import { IsString, IsArray, IsUUID, IsEmail, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeamRegistrationDto {
  @ApiProperty()
  @IsString()
  teamName: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsEmail({}, { each: true })
  memberEmails: string[];

  @ApiProperty()
  @IsUUID()
  challengeId: string;
}

export class BulkTeamRegistrationDto {
  @ApiProperty({ type: [TeamRegistrationDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  teams: TeamRegistrationDto[];
}