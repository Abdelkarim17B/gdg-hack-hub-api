import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackathonsService } from './hackathons.service';
import { HackathonsController } from './hackathons.controller';
import { TeamRegistrationController } from './controllers/team-registration.controller';
import { WinnersController } from './controllers/winners.controller';
import { TeamRegistrationService, WinnerDeterminationService } from './services';
import { Hackathon } from './entities/hackathon.entity';
import { Challenge } from './entities/challenge.entity';
import { Team } from './entities/team.entity';
import { JudgeAssignment } from './entities/judge-assignment.entity';
import { JudgingCriteria } from './entities/judging-criteria.entity';
import { Submission } from '../submissions/entities/submission.entity';
import { Evaluation } from '../evaluations/entities/evaluation.entity';

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
    WinnersController
  ],
  providers: [
    HackathonsService,
    TeamRegistrationService,
    WinnerDeterminationService
  ],
  exports: [
    HackathonsService,
    TeamRegistrationService,
    WinnerDeterminationService
  ],
})
export class HackathonsModule {}