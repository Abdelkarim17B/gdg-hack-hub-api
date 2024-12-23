import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enum';

export class UpdateRoleDto {
  @ApiProperty({
    enum: Role,
    description: 'User role',
    example: Role.PARTICIPANT,
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}