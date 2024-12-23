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
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { QuerySubmissionDto } from './dto/query-submission.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('submissions')
@Controller('submissions')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @Roles(Role.PARTICIPANT)
  @ApiOperation({ summary: 'Create a new submission' })
  @ApiResponse({ status: 201, description: 'The submission has been created.' })
  create(@Body() createSubmissionDto: CreateSubmissionDto, @Request() req) {
    return this.submissionsService.create(createSubmissionDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({ status: 200, description: 'Return all submissions.' })
  findAll(
    @Query() query: QuerySubmissionDto,
    @Query() pagination: PaginationDto,
    @Request() req,
  ) {
    return this.submissionsService.findAll(query, pagination, req.user);
  }

  @Get('my-submissions')
  @Roles(Role.PARTICIPANT)
  @ApiOperation({ summary: 'Get user\'s submissions' })
  @ApiResponse({ status: 200, description: 'Return user\'s submissions.' })
  findMySubmissions(
    @Query() pagination: PaginationDto,
    @Request() req,
  ) {
    const query: QuerySubmissionDto = { participantId: req.user.id };
    return this.submissionsService.findAll(query, pagination, req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a submission by id' })
  @ApiResponse({ status: 200, description: 'Return the submission.' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.submissionsService.findOne(id, req.user);
  }

  @Put(':id')
  @Roles(Role.PARTICIPANT)
  @ApiOperation({ summary: 'Update a submission' })
  @ApiResponse({ status: 200, description: 'The submission has been updated.' })
  update(
    @Param('id') id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
    @Request() req,
  ) {
    return this.submissionsService.update(id, updateSubmissionDto, req.user);
  }

  @Delete(':id')
  @Roles(Role.PARTICIPANT, Role.ADMIN)
  @ApiOperation({ summary: 'Delete a submission' })
  @ApiResponse({ status: 200, description: 'The submission has been deleted.' })
  remove(@Param('id') id: string, @Request() req) {
    return this.submissionsService.remove(id, req.user);
  }
}