import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { WinnerDeterminationService } from '../services/winner-determination.service';

@ApiTags('winners')
@Controller('hackathons/:hackathonId/winners')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class WinnersController {
  constructor(private readonly winnerService: WinnerDeterminationService) {}

  @Get()
  @Roles(Role.ADMIN, Role.JUDGE)
  @ApiOperation({ summary: 'Get all winners ranked by score' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns ranked list of all teams with scores.' 
  })
  async getWinners(@Param('hackathonId') hackathonId: string) {
    return this.winnerService.determineWinners(hackathonId);
  }

  @Get('by-challenge')
  @Roles(Role.ADMIN, Role.JUDGE)
  @ApiOperation({ summary: 'Get winners grouped by challenge' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns winners grouped by challenge.' 
  })
  async getWinnersByChallenge(@Param('hackathonId') hackathonId: string) {
    return this.winnerService.getWinnersByChallenge(hackathonId);
  }
}