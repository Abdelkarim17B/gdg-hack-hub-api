import { Challenge } from './challenge.entity';
import { Team } from './team.entity';
import { JudgeAssignment } from './judge-assignment.entity';
import { JudgingCriteria } from './judging-criteria.entity';
export declare enum HackathonStatus {
    DRAFT = "draft",
    REGISTRATION = "registration",
    ACTIVE = "active",
    JUDGING = "judging",
    COMPLETED = "completed"
}
export declare class Hackathon {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    registrationDeadline: Date;
    maxTeamSize: number;
    minTeamSize: number;
    status: HackathonStatus;
    rules: string;
    prizes: string;
    challenges: Challenge[];
    teams: Team[];
    judgeAssignments: JudgeAssignment[];
    judgingCriteria: JudgingCriteria[];
    createdAt: Date;
    updatedAt: Date;
}
