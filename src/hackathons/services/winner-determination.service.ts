import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { Submission } from '../../submissions/entities/submission.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';
import { JudgingCriteria } from '../entities/judging-criteria.entity';

export interface TeamScore {
  teamId: string;
  teamName: string;
  challengeId: string;
  totalScore: number;
  criteriaScores: {
    criteriaId: string;
    criteriaName: string;
    score: number;
    weight: number;
  }[];
}

@Injectable()
export class WinnerDeterminationService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
    @InjectRepository(JudgingCriteria)
    private readonly judgingCriteriaRepository: Repository<JudgingCriteria>,
  ) {}

  async determineWinners(hackathonId: string): Promise<TeamScore[]> {
    const teams = await this.teamRepository.find({
      where: { hackathon: { id: hackathonId } }, // ✅ Use relation
      relations: ['submissions', 'submissions.evaluations', 'challenge'],
    });

    const criteria = await this.judgingCriteriaRepository.find({
      where: { hackathon: { id: hackathonId } }, // ✅ Use relation
    });

    const teamScores: TeamScore[] = [];

    for (const team of teams) {
      const latestSubmission = team.submissions
        .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())[0];

      if (!latestSubmission) continue;

      const criteriaScores = await Promise.all(
        criteria.map(async (criterion) => {
          const evaluations = await this.evaluationRepository.find({
            where: {
              submission: { id: latestSubmission.id }, // ✅ Use relation
              criteria: { id: criterion.id }, // ✅ Use relation
            },
          });

          // Calculate average score for this criterion
          const avgScore =
            evaluations.length > 0
              ? evaluations.reduce((acc, evaluation) => acc + evaluation.score, 0) /
                evaluations.length
              : 0;

          return {
            criteriaId: criterion.id,
            criteriaName: criterion.name,
            score: avgScore,
            weight: criterion.weight,
          };
        })
      );

      // Calculate total weighted score
      const totalScore = criteriaScores.reduce(
        (sum, { score, weight }) => sum + score * weight,
        0
      );

      teamScores.push({
        teamId: team.id,
        teamName: team.name,
        challengeId: team.challenge.id, // ✅ Use relation
        totalScore,
        criteriaScores,
      });
    }

    return teamScores.sort((a, b) => b.totalScore - a.totalScore);
  }

  async getWinnersByChallenge(hackathonId: string): Promise<Record<string, TeamScore[]>> {
    const allScores = await this.determineWinners(hackathonId);

    const winnersByChallenge: Record<string, TeamScore[]> = {};

    allScores.forEach((score) => {
      if (!winnersByChallenge[score.challengeId]) {
        winnersByChallenge[score.challengeId] = [];
      }
      winnersByChallenge[score.challengeId].push(score);
    });

    Object.values(winnersByChallenge).forEach((teams) => {
      teams.sort((a, b) => b.totalScore - a.totalScore);
    });

    return winnersByChallenge;
  }
}
