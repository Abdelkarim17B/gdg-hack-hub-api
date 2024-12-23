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
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { QueryEvaluationDto } from './dto/query-evaluation.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('evaluations')
@Controller('evaluations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Post()
  @Roles(Role.JUDGE)
  @ApiOperation({ summary: 'Create a new evaluation' })
  @ApiResponse({ status: 201, description: 'The evaluation has been created.' })
  create(@Body() createEvaluationDto: CreateEvaluationDto, @Request() req) {
    return this.evaluationsService.create(createEvaluationDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all evaluations' })
  @ApiResponse({ status: 200, description: 'Return all evaluations.' })
  findAll(
    @Query() query: QueryEvaluationDto,
    @Query() pagination: PaginationDto,
    @Request() req,
  ) {
    return this.evaluationsService.findAll(query, pagination, req.user);
  }

  @Get('my-evaluations')
  @Roles(Role.JUDGE)
  @ApiOperation({ summary: 'Get judge\'s evaluations' })
  @ApiResponse({ status: 200, description: 'Return judge\'s evaluations.' })
  findMyEvaluations(
    @Query() pagination: PaginationDto,
    @Request() req,
  ) {
    const query: QueryEvaluationDto = { judgeId: req.user.id };
    return this.evaluationsService.findAll(query, pagination, req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an evaluation by id' })
  @ApiResponse({ status: 200, description: 'Return the evaluation.' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.evaluationsService.findOne(id, req.user);
  }

  @Put(':id')
  @Roles(Role.JUDGE)
  @ApiOperation({ summary: 'Update an evaluation' })
  @ApiResponse({ status: 200, description: 'The evaluation has been updated.' })
  update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
    @Request() req,
  ) {
    return this.evaluationsService.update(id, updateEvaluationDto, req.user);
  }

  @Delete(':id')
  @Roles(Role.JUDGE, Role.ADMIN)
  @ApiOperation({ summary: 'Delete an evaluation' })
  @ApiResponse({ status: 200, description: 'The evaluation has been deleted.' })
  remove(@Param('id') id: string, @Request() req) {
    return this.evaluationsService.remove(id, req.user);
  }
}