import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Put, 
  Param, 
  Delete, 
  Query,
  UseGuards,
  BadRequestException
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { validateUUID } from '../common/utils/validation.util';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll(@Query() pagination: PaginationDto) {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  async findOne(@Param('id') id: string) {
    validateUUID(id);
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    validateUUID(id);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  async remove(@Param('id') id: string) {
    validateUUID(id);
    return this.usersService.remove(id);
  }

  @Put(':id/role')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({ 
    status: 200, 
    description: 'The user role has been successfully updated.',
    schema: {
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { 
          type: 'string',
          enum: Object.values(Role),
          description: 'The new role assigned to the user'
        },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    validateUUID(id);
    const user = await this.usersService.findOne(id);
    
    // Prevent changing admin roles if they're the last admin
    if (user.role === Role.ADMIN && updateRoleDto.role !== Role.ADMIN) {
      const adminCount = await this.usersService.countByRole(Role.ADMIN);
      if (adminCount <= 1) {
        throw new BadRequestException(
          'Cannot change role: This is the last administrator account'
        );
      }
    }
    
    return this.usersService.setRole(id, updateRoleDto.role);
  }
}