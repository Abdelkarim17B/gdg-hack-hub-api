import { User } from '../../users/entities/user.entity';
import { Submission } from '../../submissions/entities/submission.entity';
import { JudgingCriteria } from '../../hackathons/entities/judging-criteria.entity';
export declare class Evaluation {
    id: string;
    submission: Submission;
    submissionId: string;
    judge: User;
    judgeId: string;
    criteria: JudgingCriteria;
    criteriaId: string;
    score: number;
    feedback: string;
    evaluatedAt: Date;
}
