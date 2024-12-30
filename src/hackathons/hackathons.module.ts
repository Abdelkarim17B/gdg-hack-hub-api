import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackathonsService } from './hackathons.service';
import { HackathonsController } from './hackathons.controller';
import { TeamRegistrationController } from './controllers/team-registration.controller';
import { WinnersController } from './controllers/winners.controller';
import { ChallengeService, JudgingCriteriaService, TeamRegistrationService, WinnerDeterminationService } from './services';
import { Hackathon } from './entities/hackathon.entity';
import { Challenge } from './entities/challenge.entity';
import { Team } from './entities/team.entity';
import { JudgeAssignment } from './entities/judge-assignment.entity';
import { JudgingCriteria } from './entities/judging-criteria.entity';
import { Submission } from '../submissions/entities/submission.entity';
import { Evaluation } from '../evaluations/entities/evaluation.entity';
import { ChallengeController } from './controllers/challenge.controller';
import { JudgingCriteriaController } from './controllers/judgingCriteria.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hackathon,
      Challenge,
      Team,
      JudgeAssignment,
      JudgingCriteria,
      Submission,
      Evaluation
    ]),
  ],
  controllers: [
    HackathonsController,
    TeamRegistrationController,
    WinnersController,
    ChallengeController,
    JudgingCriteriaController
  ],
  providers: [
    HackathonsService,
    TeamRegistrationService,
    WinnerDeterminationService,
    ChallengeService,
    JudgingCriteriaService
  ],
  exports: [
    HackathonsService,
    TeamRegistrationService,
    WinnerDeterminationService,
    ChallengeService,
    JudgingCriteriaService
  ],
})
export class HackathonsModule {}