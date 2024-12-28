import { Controller, Post, Body, Param, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { TeamRegistrationService } from '../services/team-registration.service';
import { BodySchemaDto, BulkTeamRegistrationDto } from '../dto/team-registration.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('teams')
@Controller('hackathons/:hackathonId/teams')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()

export class TeamRegistrationController {
  constructor(private readonly teamRegistrationService: TeamRegistrationService) {}

  @Post('register-bulk')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Register multiple teams from sheet data' })
  @ApiResponse({ 
    status: 201, 
    description: 'Teams have been registered successfully.' 
  })
  async registerTeams(
    @Param('hackathonId') hackathonId: string,
    @Body() bulkRegistrationDto: BulkTeamRegistrationDto
  ) {
    return this.teamRegistrationService.registerTeamsFromSheet(
      hackathonId, 
      bulkRegistrationDto.teams
    );
    }
  
    
    
    @Post('validate-emails')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Validate if emails are available for team registration' })
    @ApiResponse({ 
      status: 200, 
      description: 'Returns true if all emails are available.', 
    })
    @ApiBody({ type: BodySchemaDto })
    async validateEmails(
      @Param('hackathonId') hackathonId: string,
      @Body('emails') emails: string[]
    ) {
      return this.teamRegistrationService.validateTeamRegistration(hackathonId, emails);
    }

    @Get('')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'get All Teams' })
    @ApiResponse({ 
      status: 200, 
      description: 'Returns All teams.', 
    })
    async getAllTeams(
      @Param('hackathonId') hackathonId: string,
      @Query()  pagination:PaginationDto,

    ){
      return this.teamRegistrationService.getAllTeams(hackathonId,pagination)
    }
    
  
}