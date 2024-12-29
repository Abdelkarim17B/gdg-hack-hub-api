import { Controller, Post, Body, Param, Get, UseGuards, Query, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ChallengeService } from '../services/challenge.service';
import { CreateChallengeDto, UpdateChallengeDto } from '../dto/challenge.dto';

@ApiTags('challenge')
@Controller('hackathons/:hackathonId/challenge')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()

export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new challenge' })
  @ApiResponse({ 
    status: 201, 
    description: 'Challenge has been created successfully.' 
  })
  @ApiParam({ name: 'hackathonId', required: true })
  @ApiBody({ type: CreateChallengeDto })
  async createChallenge(
    @Param('hackathonId') hackathonId: string,
    @Body() createChallengeDto: CreateChallengeDto
  ){
  return this.challengeService.create(
    createChallengeDto,
    hackathonId,
  );
  }
  @Get('')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all challenges' })
  @ApiResponse({ 
    status: 200, 
    description: 'Challenges retrieved successfully.' 
  })
  @ApiParam({ name: 'hackathonId', required: true })
  async getAllChallenges(
    @Param('hackathonId') hackathonId: string,
    @Query() pagination: PaginationDto,

  ) {
    return this.challengeService.findAll(hackathonId,pagination)
  }
@Get(':challengeId')
// @Roles(Role.ADMIN)
@ApiOperation({ summary: 'Get a single challenge' })
@ApiResponse({ 
  status: 200, 
  description: 'Challenge retrieved successfully.' 
})
@ApiParam({ name: 'hackathonId', required: true })
@ApiParam({ name: 'challengeId', required: true })
async getChallenge(
  @Param('hackathonId') hackathonId: string,
  @Param('challengeId') challengeId: string,
) {
  return this.challengeService.findOne(challengeId)
}

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update an existing challenge' })
  @ApiResponse({ 
    status: 200, 
    description: 'Challenge has been updated successfully.' 
  })
  @ApiParam({ name: 'hackathonId', required: true })
  @ApiParam({ name: 'id', required: true })

  @ApiBody({ type: UpdateChallengeDto })
  async updateChallenge(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto
  ){
  return this.challengeService.update(
    updateChallengeDto,
    id,
  );
  }


@Delete(':challengeId')
@Roles(Role.ADMIN)
@ApiOperation({ summary: 'Delete a single challenge' })
@ApiResponse({ 
  status: 200, 
  description: 'Challenge deleted successfully.' 
})
@ApiParam({ name: 'hackathonId', required: true })
@ApiParam({ name: 'challengeId', required: true })
async deleteChallenge(
  @Param('challengeId') challengeId: string,
) {
  return this.challengeService.delete(challengeId)
}
  
    
    
  
}