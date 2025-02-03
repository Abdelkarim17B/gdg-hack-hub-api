import { SubmissionStatus } from '../entities/submission.entity';
export declare class SubmissionFieldDto {
    name: string;
    link: string;
    description?: string;
}
export declare class CreateSubmissionDto {
    title: string;
    description: string;
    fields: SubmissionFieldDto[];
    teamId: string;
    status: SubmissionStatus;
}
