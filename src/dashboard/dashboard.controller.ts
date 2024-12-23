import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('statistics')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Return dashboard statistics.' })
  async getStatistics() {
    return this.dashboardService.getStatistics();
  }

  @Get('recent-activities')
  @ApiOperation({ summary: 'Get recent activities' })
  @ApiResponse({ status: 200, description: 'Return recent activities.' })
  async getRecentActivities() {
    return this.dashboardService.getRecentActivities();
  }

  @Get('hackathon-metrics')
  @ApiOperation({ summary: 'Get hackathon metrics' })
  @ApiResponse({ status: 200, description: 'Return hackathon metrics.' })
  async getHackathonMetrics() {
    return this.dashboardService.getHackathonMetrics();
  }
}