import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { JudgingCriteria } from '../entities/judging-criteria.entity';
import { CreateJudgingCriteriaDto } from '../dto/judging-criteria.dto';
export declare class JudgingCriteriaService {
    private JudgingCriteriaRepository;
    constructor(JudgingCriteriaRepository: Repository<JudgingCriteria>);
    create(CreateJudgingCriteriaDto: CreateJudgingCriteriaDto, hackathonId: string): Promise<JudgingCriteria>;
    findAll(hackathonId: string, pagination: PaginationDto): Promise<{
        JudgingCriterias: JudgingCriteria[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(JudgingCriteriaId: string): Promise<JudgingCriteria>;
    update(updateJudgingCriteriaDto: CreateJudgingCriteriaDto, id: string): Promise<JudgingCriteria>;
    delete(JudgingCriteriaId: string): Promise<JudgingCriteria>;
}
