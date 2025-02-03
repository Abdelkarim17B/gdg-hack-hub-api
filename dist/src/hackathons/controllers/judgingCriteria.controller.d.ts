import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JudgingCriteriaService } from '../services/judgingCriteria.service';
import { CreateJudgingCriteriaDto } from '../dto/judging-criteria.dto';
export declare class JudgingCriteriaController {
    private readonly judgingCriteriaService;
    constructor(judgingCriteriaService: JudgingCriteriaService);
    createjudgingCriteria(hackathonId: string, createjudgingCriteriaDto: CreateJudgingCriteriaDto): Promise<import("../entities/judging-criteria.entity").JudgingCriteria>;
    getAlljudgingCriterias(hackathonId: string, pagination: PaginationDto): Promise<{
        JudgingCriterias: import("../entities/judging-criteria.entity").JudgingCriteria[];
        total: number;
        page: number;
        limit: number;
    }>;
    getjudgingCriteria(hackathonId: string, judgingCriteriaId: string): Promise<import("../entities/judging-criteria.entity").JudgingCriteria>;
    updatejudgingCriteria(id: string, updatejudgingCriteriaDto: CreateJudgingCriteriaDto): Promise<import("../entities/judging-criteria.entity").JudgingCriteria>;
    deletejudgingCriteria(judgingCriteriaId: string): Promise<import("../entities/judging-criteria.entity").JudgingCriteria>;
}
