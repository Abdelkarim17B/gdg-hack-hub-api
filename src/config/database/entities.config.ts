import { User } from '../../users/entities/user.entity';
import { Hackathon } from '../../hackathons/entities/hackathon.entity';
import { Challenge } from '../../hackathons/entities/challenge.entity';
import { Team } from '../../hackathons/entities/team.entity';
import { JudgeAssignment } from '../../hackathons/entities/judge-assignment.entity';
import { JudgingCriteria } from '../../hackathons/entities/judging-criteria.entity';
import { Submission } from '../../submissions/entities/submission.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';

export const entities = [
  User,
  Hackathon,
  Challenge,
  Team,
  JudgeAssignment,
  JudgingCriteria,
  Submission,
  Evaluation
];