import { Controller, Post, Body, Param, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { TeamRegistrationService } from '../services/team-registration.service';
import { AddParticipantToTeamDto, BodySchemaDto, BulkTeamRegistrationDto, removeParticipantFromTeamDto } from '../dto/team-registration.dto';
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
    @ApiOperation({ summary: 'Get all teams' })
    @ApiResponse({ 
      status: 200, 
      description: 'Returns all teams.', 
    })
    @ApiParam({ name: 'hackathonId', required: true })
    // @ApiQuery({ type: PaginationDto })
    async getAllTeams(
      @Param('hackathonId') hackathonId: string,
      @Query() pagination: PaginationDto,
    ) {
      return this.teamRegistrationService.getAllTeams(hackathonId, pagination);
    }
    @Get(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Get one team' })
    @ApiResponse({ 
      status: 200, 
      description: 'Returns one team.', 
    })
    @ApiParam({ name: 'hackathonId', required: true })
    @ApiParam({ name: 'id', required: true })
    async getOneTeam(
      @Param('hackathonId') hackathonId: string,
      @Param('id') id: string,
    ) {
      return this.teamRegistrationService.getOneTeam(hackathonId, id);
    }
    
    @Post('add-participant')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Add participant to team' })
    @ApiResponse({ 
      status: 200, 
      description: 'Participant added to team successfully.', 
    })
    @ApiParam({ name: 'hackathonId', required: true })
    @ApiBody({ type: AddParticipantToTeamDto })
    async addParticipantToTeam(
      @Param('hackathonId') hackathonId: string,
      @Body('teamId') teamId: string,
      @Body('participantId') participantId: string,
    ) {
      return this.teamRegistrationService.addParticipantToTeam(hackathonId, teamId, participantId)
    }
    
    @Post('remove-participant-from-team')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Add participant to team' })
    @ApiResponse({ 
      status: 200, 
      description: 'Participant added to team successfully.', 
    })
    @ApiParam({ name: 'hackathonId', required: true })
    @ApiBody({ type: removeParticipantFromTeamDto })
    async removeParticipantFromTeam(
      @Param('hackathonId') hackathonId: string,
      @Body('participantEmail') participantEmail: string
    ) {
      return this.teamRegistrationService.removeParticipantFromTeam(
        hackathonId, 
        participantEmail
      )
    }

  
}