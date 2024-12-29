import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateChallengeDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    criteria: string;

    // @IsUUID()
    // @IsNotEmpty()
    // hackathonId: string;
}

export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {}

