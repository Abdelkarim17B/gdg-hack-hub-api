import { SubmissionStatus } from '../entities/submission.entity';
export declare class QuerySubmissionDto {
    hackathonId?: string;
    participantId?: string;
    status?: SubmissionStatus;
    search?: string;
    teamId?: string;
}
