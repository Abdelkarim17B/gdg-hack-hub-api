import { Controller, Post, Body, Param, Get, UseGuards, Query, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JudgingCriteriaService } from '../services/judgingCriteria.service';
import { CreateJudgingCriteriaDto,  } from '../dto/judging-criteria.dto';

@ApiTags('judgingCriteria')
@Controller('hackathons/:hackathonId/judgingCriteria')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()

export class JudgingCriteriaController {
  constructor(private readonly judgingCriteriaService: JudgingCriteriaService) {}

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new judgingCriteria' })
  @ApiResponse({ 
    status: 201, 
    description: 'judgingCriteria has been created successfully.' 
  })
  @ApiParam({ name: 'hackathonId', required: true })
  @ApiBody({ type: CreateJudgingCriteriaDto })
  async createjudgingCriteria(
    @Param('hackathonId') hackathonId: string,
    @Body() createjudgingCriteriaDto: CreateJudgingCriteriaDto
  ){
  return this.judgingCriteriaService.create(
    createjudgingCriteriaDto,
    hackathonId,
  );
  }
  @Get('')
//   @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all judgingCriterias' })
  @ApiResponse({ 
    status: 200, 
    description: 'judgingCriterias retrieved successfully.' 
  })
  @ApiParam({ name: 'hackathonId', required: true })
  async getAlljudgingCriterias(
    @Param('hackathonId') hackathonId: string,
    @Query() pagination: PaginationDto,

  ) {
    return this.judgingCriteriaService.findAll(hackathonId,pagination)
  }
@Get(':judgingCriteriaId')
// @Roles(Role.ADMIN)
@ApiOperation({ summary: 'Get a single judgingCriteria' })
@ApiResponse({ 
  status: 200, 
  description: 'judgingCriteria retrieved successfully.' 
})
@ApiParam({ name: 'hackathonId', required: true })
@ApiParam({ name: 'judgingCriteriaId', required: true })
async getjudgingCriteria(
  @Param('hackathonId') hackathonId: string,
  @Param('judgingCriteriaId') judgingCriteriaId: string,
) {
  return this.judgingCriteriaService.findOne(judgingCriteriaId)
}

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update an existing judgingCriteria' })
  @ApiResponse({ 
    status: 200, 
    description: 'judgingCriteria has been updated successfully.' 
  })
  @ApiParam({ name: 'hackathonId', required: true })
  @ApiParam({ name: 'id', required: true })

  @ApiBody({ type: CreateJudgingCriteriaDto })
  async updatejudgingCriteria(
    @Param('id') id: string,
    @Body() updatejudgingCriteriaDto: CreateJudgingCriteriaDto
  ){
  return this.judgingCriteriaService.update(
    updatejudgingCriteriaDto,
    id,
  );
  }


@Delete(':judgingCriteriaId')
@Roles(Role.ADMIN)
@ApiOperation({ summary: 'Delete a single judgingCriteria' })
@ApiResponse({ 
  status: 200, 
  description: 'judgingCriteria deleted successfully.' 
})
@ApiParam({ name: 'hackathonId', required: true })
@ApiParam({ name: 'judgingCriteriaId', required: true })
async deletejudgingCriteria(
  @Param('judgingCriteriaId') judgingCriteriaId: string,
) {
  return this.judgingCriteriaService.delete(judgingCriteriaId);
}
  
    
    
  
}