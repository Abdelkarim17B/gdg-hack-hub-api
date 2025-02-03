import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStatistics(): Promise<{
        totalUsers: number;
        totalHackathons: number;
        activeHackathons: number;
        totalSubmissions: number;
        totalEvaluations: number;
    }>;
    getRecentActivities(): Promise<{
        recentSubmissions: import("../submissions/entities/submission.entity").Submission[];
        recentEvaluations: import("../evaluations/entities/evaluation.entity").Evaluation[];
    }>;
    getHackathonMetrics(): Promise<any[]>;
}
