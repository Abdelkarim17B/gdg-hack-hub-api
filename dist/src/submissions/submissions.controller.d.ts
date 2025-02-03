import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { QuerySubmissionDto } from './dto/query-submission.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    create(createSubmissionDto: CreateSubmissionDto, req: any): Promise<import("./entities/submission.entity").Submission>;
    findAll(query: QuerySubmissionDto, pagination: PaginationDto, req: any): Promise<{
        items: import("./entities/submission.entity").Submission[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findMySubmissions(pagination: PaginationDto, req: any): Promise<{
        items: import("./entities/submission.entity").Submission[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, req: any): Promise<import("./entities/submission.entity").Submission>;
    update(id: string, updateSubmissionDto: UpdateSubmissionDto, req: any): Promise<import("./entities/submission.entity").Submission>;
    remove(id: string, req: any): Promise<void>;
}
