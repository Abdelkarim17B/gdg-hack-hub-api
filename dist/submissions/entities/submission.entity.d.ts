import { Team } from '../../hackathons/entities/team.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';
export declare enum SubmissionStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    UNDER_REVIEW = "under_review",
    EVALUATED = "evaluated"
}
export declare class Submission {
    id: string;
    title: string;
    description: string;
    fields: {
        name: string;
        link: string;
        description?: string;
    }[];
    team: Team;
    teamId: string;
    status: SubmissionStatus;
    evaluations: Evaluation[];
    submittedAt: Date;
}
