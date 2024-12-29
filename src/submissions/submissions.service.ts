import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { QuerySubmissionDto } from './dto/query-submission.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enums/role.enum';
import { Team } from '../hackathons/entities/team.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto, user: User): Promise<Submission> {
    // Find team by ID and verify user is a member
    const team = await this.teamRepository.findOne({
      where: { id: createSubmissionDto.teamId }
    });

    if (!team) {
      throw new NotFoundException(`Team not found`);
    }

    if (!team.memberEmails.includes(user.email)) {
      throw new ForbiddenException('You must be a team member to submit');
    }

    const submission = this.submissionRepository.create({
      ...createSubmissionDto,
      teamId: createSubmissionDto.teamId 
    });

    return await this.submissionRepository.save(submission);
  }

  async findAll(query: QuerySubmissionDto, pagination: PaginationDto, user?: User) {
    const queryBuilder = this.submissionRepository.createQueryBuilder('submission')
      .leftJoinAndSelect('submission.team', 'team')
      .leftJoinAndSelect('team.hackathon', 'hackathon')
      .leftJoinAndSelect('team.challenge', 'challenge');

    // If participant, only show their team's submissions
    if (user?.role === Role.PARTICIPANT) {
      queryBuilder.where('team.memberEmails LIKE :email', { email: `%${user.email}%` });
    }

    if (query.teamId) {
      queryBuilder.andWhere('submission.teamId = :teamId', {
        teamId: query.teamId
      });
    }

    if (query.status) {
      queryBuilder.andWhere('submission.status = :status', { 
        status: query.status 
      });
    }

    if (query.search) {
      queryBuilder.andWhere(
        '(submission.title ILIKE :search OR submission.description ILIKE :search)',
        { search: `%${query.search}%` }
      );
    }

    const skip = (pagination.page - 1) * pagination.limit;
    queryBuilder.skip(skip).take(pagination.limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      total,
      page: pagination.page,
      limit: pagination.limit,
      pages: Math.ceil(total / pagination.limit),
    }
  }

  async findOne(id: string, user: User): Promise<Submission> {
    const submission = await this.submissionRepository.findOne({
      where: { id },
      relations: ['team', 'team.hackathon', 'team.challenge']
    });
    

    if (!submission) {
      throw new NotFoundException(`Submission with ID ${id} not found`);
    }

    // Verify user has access
    if (user.role === Role.PARTICIPANT && !submission.team.memberEmails.includes(user.email)) {
      throw new ForbiddenException('You can only access your team\'s submissions');
    }

    return submission;
  }

  async update(id: string, updateSubmissionDto: UpdateSubmissionDto, user: User): Promise<Submission> {
    const submission = await this.findOne(id, user);
    
    if (user.role === Role.PARTICIPANT && !submission.team.memberEmails.includes(user.email)) {
      throw new ForbiddenException('You can only update your team\'s submissions');
    }

    Object.assign(submission, updateSubmissionDto);
    return await this.submissionRepository.save(submission);
  }

  async remove(id: string, user: User): Promise<void> {
    const submission = await this.findOne(id, user);
    
    if (user.role === Role.PARTICIPANT && !submission.team.memberEmails.includes(user.email)) {
      throw new ForbiddenException('You can only delete your team\'s submissions');
    }

    await this.submissionRepository.remove(submission);
  }
}