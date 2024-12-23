import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { QueryEvaluationDto } from './dto/query-evaluation.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from '../users/entities/user.entity';
import { JudgingCriteria } from '../hackathons/entities/judging-criteria.entity';
import { JudgeAssignment } from '../hackathons/entities/judge-assignment.entity';
export declare class EvaluationsService {
    private evaluationRepository;
    private judgingCriteriaRepository;
    private judgeAssignmentRepository;
    constructor(evaluationRepository: Repository<Evaluation>, judgingCriteriaRepository: Repository<JudgingCriteria>, judgeAssignmentRepository: Repository<JudgeAssignment>);
    create(createEvaluationDto: CreateEvaluationDto, user: User): Promise<Evaluation>;
    findAll(query: QueryEvaluationDto, pagination: PaginationDto, user?: User): Promise<{
        items: Evaluation[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, user: User): Promise<Evaluation>;
    update(id: string, updateEvaluationDto: UpdateEvaluationDto, user: User): Promise<Evaluation>;
    remove(id: string, user: User): Promise<void>;
}
