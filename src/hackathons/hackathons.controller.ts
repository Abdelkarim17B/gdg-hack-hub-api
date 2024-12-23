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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HackathonsService } from './hackathons.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { QueryHackathonDto } from './dto/query-hackathon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('hackathons')
@Controller('hackathons')
export class HackathonsController {
  constructor(private readonly hackathonsService: HackathonsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new hackathon' })
  @ApiResponse({ status: 201, description: 'The hackathon has been created.' })
  create(@Body() createHackathonDto: CreateHackathonDto) {
    return this.hackathonsService.create(createHackathonDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all hackathons' })
  @ApiResponse({ status: 200, description: 'Return all hackathons.' })
  findAll(@Query() query: QueryHackathonDto, @Query() pagination: PaginationDto) {
    return this.hackathonsService.findAll(query, pagination);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a hackathon by id' })
  @ApiResponse({ status: 200, description: 'Return the hackathon.' })
  findOne(@Param('id') id: string) {
    return this.hackathonsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a hackathon' })
  @ApiResponse({ status: 200, description: 'The hackathon has been updated.' })
  update(@Param('id') id: string, @Body() updateHackathonDto: UpdateHackathonDto) {
    return this.hackathonsService.update(id, updateHackathonDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a hackathon' })
  @ApiResponse({ status: 200, description: 'The hackathon has been deleted.' })
  remove(@Param('id') id: string) {
    return this.hackathonsService.remove(id);
  }
}