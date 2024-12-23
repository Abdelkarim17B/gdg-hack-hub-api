import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { QueryEvaluationDto } from './dto/query-evaluation.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enums/role.enum';
import { JudgingCriteria } from '../hackathons/entities/judging-criteria.entity';
import { JudgeAssignment } from '../hackathons/entities/judge-assignment.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
    @InjectRepository(JudgingCriteria)
    private judgingCriteriaRepository: Repository<JudgingCriteria>,
    @InjectRepository(JudgeAssignment)
    private judgeAssignmentRepository: Repository<JudgeAssignment>,
  ) {}

  async create(createEvaluationDto: CreateEvaluationDto, user: User): Promise<Evaluation> {
    // Verify judge is assigned to this hackathon
    const criteria = await this.judgingCriteriaRepository.findOne({
      where: { id: createEvaluationDto.criteriaId },
      relations: ['hackathon']
    });

    if (!criteria) {
      throw new NotFoundException('Judging criteria not found');
    }

    const assignment = await this.judgeAssignmentRepository.findOne({
      where: {
        judgeId: user.id,
        hackathonId: criteria.hackathon.id
      }
    });

    if (!assignment) {
      throw new ForbiddenException('You are not assigned as a judge for this hackathon');
    }

    // Validate score is within criteria bounds
    if (createEvaluationDto.score < 0 || createEvaluationDto.score > criteria.maxScore) {
      throw new ForbiddenException(`Score must be between 0 and ${criteria.maxScore}`);
    }

    const evaluation = this.evaluationRepository.create({
      ...createEvaluationDto,
      judgeId: user.id
    });

    return await this.evaluationRepository.save(evaluation);
  }

  async findAll(query: QueryEvaluationDto, pagination: PaginationDto, user?: User) {
    const queryBuilder = this.evaluationRepository.createQueryBuilder('evaluation')
      .leftJoinAndSelect('evaluation.judge', 'judge')
      .leftJoinAndSelect('evaluation.submission', 'submission')
      .leftJoinAndSelect('evaluation.criteria', 'criteria')
      .leftJoinAndSelect('submission.team', 'team')
      .leftJoinAndSelect('team.hackathon', 'hackathon');

    if (user?.role === Role.JUDGE) {
      queryBuilder.where('evaluation.judgeId = :judgeId', { judgeId: user.id });
    }

    if (query.submissionId) {
      queryBuilder.andWhere('evaluation.submissionId = :submissionId', {
        submissionId: query.submissionId
      });
    }

    if (query.judgeId) {
      queryBuilder.andWhere('evaluation.judgeId = :judgeId', {
        judgeId: query.judgeId
      });
    }

    const skip = (pagination.page - 1) * pagination.limit;
    queryBuilder.skip(skip).take(pagination.limit);
    queryBuilder.orderBy('evaluation.evaluatedAt', 'DESC');

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      total,
      page: pagination.page,
      limit: pagination.limit,
      pages: Math.ceil(total / pagination.limit),
    };
  }

  async findOne(id: string, user: User): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.findOne({
      where: { id },
      relations: ['judge', 'submission', 'criteria', 'submission.team', 'submission.team.hackathon']
    });

    if (!evaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }

    if (user.role === Role.JUDGE && evaluation.judgeId !== user.id) {
      throw new ForbiddenException('You can only access your own evaluations');
    }

    return evaluation;
  }

  async update(id: string, updateEvaluationDto: UpdateEvaluationDto, user: User): Promise<Evaluation> {
    const evaluation = await this.findOne(id, user);
    
    if (user.role === Role.JUDGE && evaluation.judgeId !== user.id) {
      throw new ForbiddenException('You can only update your own evaluations');
    }

    if (updateEvaluationDto.score !== undefined) {
      const criteria = await this.judgingCriteriaRepository.findOne({
        where: { id: evaluation.criteriaId }
      });

      if (updateEvaluationDto.score < 0 || updateEvaluationDto.score > criteria.maxScore) {
        throw new ForbiddenException(`Score must be between 0 and ${criteria.maxScore}`);
      }
    }

    Object.assign(evaluation, updateEvaluationDto);
    return await this.evaluationRepository.save(evaluation);
  }

  async remove(id: string, user: User): Promise<void> {
    const evaluation = await this.findOne(id, user);
    
    if (user.role === Role.JUDGE && evaluation.judgeId !== user.id) {
      throw new ForbiddenException('You can only delete your own evaluations');
    }

    await this.evaluationRepository.remove(evaluation);
  }
}