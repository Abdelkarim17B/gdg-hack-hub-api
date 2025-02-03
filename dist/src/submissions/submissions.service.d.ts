import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { QuerySubmissionDto } from './dto/query-submission.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from '../users/entities/user.entity';
import { Team } from '../hackathons/entities/team.entity';
export declare class SubmissionsService {
    private submissionRepository;
    private teamRepository;
    constructor(submissionRepository: Repository<Submission>, teamRepository: Repository<Team>);
    create(createSubmissionDto: CreateSubmissionDto, user: User): Promise<Submission>;
    findAll(query: QuerySubmissionDto, pagination: PaginationDto, user?: User): Promise<{
        items: Submission[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, user: User): Promise<Submission>;
    update(id: string, updateSubmissionDto: UpdateSubmissionDto, user: User): Promise<Submission>;
    remove(id: string, user: User): Promise<void>;
}
