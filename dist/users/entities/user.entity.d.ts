import { Role } from '../../common/enums/role.enum';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';
import { JudgeAssignment } from '../../hackathons/entities/judge-assignment.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    role: Role;
    name: string;
    judgeAssignments: JudgeAssignment[];
    evaluations: Evaluation[];
    createdAt: Date;
    updatedAt: Date;
}
