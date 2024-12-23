import { User } from '../../users/entities/user.entity';
import { Hackathon } from '../../hackathons/entities/hackathon.entity';
import { Challenge } from '../../hackathons/entities/challenge.entity';
import { Team } from '../../hackathons/entities/team.entity';
import { JudgeAssignment } from '../../hackathons/entities/judge-assignment.entity';
import { JudgingCriteria } from '../../hackathons/entities/judging-criteria.entity';
import { Submission } from '../../submissions/entities/submission.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';
export declare const entities: (typeof User | typeof Hackathon | typeof Challenge | typeof Team | typeof JudgeAssignment | typeof JudgingCriteria | typeof Submission | typeof Evaluation)[];
