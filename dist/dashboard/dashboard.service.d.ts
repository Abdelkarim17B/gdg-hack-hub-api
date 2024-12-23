import { Repository } from 'typeorm';
import { Hackathon } from '../hackathons/entities/hackathon.entity';
import { Submission } from '../submissions/entities/submission.entity';
import { Evaluation } from '../evaluations/entities/evaluation.entity';
import { User } from '../users/entities/user.entity';
export declare class DashboardService {
    private readonly hackathonRepository;
    private readonly submissionRepository;
    private readonly evaluationRepository;
    private readonly userRepository;
    constructor(hackathonRepository: Repository<Hackathon>, submissionRepository: Repository<Submission>, evaluationRepository: Repository<Evaluation>, userRepository: Repository<User>);
    getStatistics(): Promise<{
        totalUsers: number;
        totalHackathons: number;
        activeHackathons: number;
        totalSubmissions: number;
        totalEvaluations: number;
    }>;
    getRecentActivities(): Promise<{
        recentSubmissions: Submission[];
        recentEvaluations: Evaluation[];
    }>;
    getHackathonMetrics(): Promise<any[]>;
}
