import { Hackathon } from './hackathon.entity';
import { User } from '../../users/entities/user.entity';
export declare class JudgeAssignment {
    id: string;
    hackathon: Hackathon;
    hackathonId: string;
    judge: User;
    judgeId: string;
    assignedAt: Date;
}
