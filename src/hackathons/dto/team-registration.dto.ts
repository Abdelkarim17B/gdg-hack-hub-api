import { IsString, IsArray, IsUUID, IsEmail, ArrayMinSize, ArrayMaxSize, isUUID } from 'class-validator';
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
export class BodySchemaDto {
  @ApiProperty({ type: [String], description: 'List of emails to validate' })
  @IsArray()
  @IsString({ each: true })
  emails: string[];
}
export class AddParticipantToTeamDto {
  @ApiProperty()
  @IsUUID()
  teamId: string;

  @ApiProperty()
  @IsUUID()
  participantId: string;
}