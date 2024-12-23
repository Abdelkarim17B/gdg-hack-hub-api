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
export declare class WinnerDeterminationService {
    private readonly teamRepository;
    private readonly submissionRepository;
    private readonly evaluationRepository;
    private readonly judgingCriteriaRepository;
    constructor(teamRepository: Repository<Team>, submissionRepository: Repository<Submission>, evaluationRepository: Repository<Evaluation>, judgingCriteriaRepository: Repository<JudgingCriteria>);
    determineWinners(hackathonId: string): Promise<TeamScore[]>;
    getWinnersByChallenge(hackathonId: string): Promise<Record<string, TeamScore[]>>;
}
