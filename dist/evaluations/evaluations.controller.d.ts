import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { QueryEvaluationDto } from './dto/query-evaluation.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class EvaluationsController {
    private readonly evaluationsService;
    constructor(evaluationsService: EvaluationsService);
    create(createEvaluationDto: CreateEvaluationDto, req: any): Promise<import("./entities/evaluation.entity").Evaluation>;
    findAll(query: QueryEvaluationDto, pagination: PaginationDto, req: any): Promise<{
        items: import("./entities/evaluation.entity").Evaluation[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findMyEvaluations(pagination: PaginationDto, req: any): Promise<{
        items: import("./entities/evaluation.entity").Evaluation[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, req: any): Promise<import("./entities/evaluation.entity").Evaluation>;
    update(id: string, updateEvaluationDto: UpdateEvaluationDto, req: any): Promise<import("./entities/evaluation.entity").Evaluation>;
    remove(id: string, req: any): Promise<void>;
}
