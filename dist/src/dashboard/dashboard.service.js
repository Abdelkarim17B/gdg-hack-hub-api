"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hackathon_entity_1 = require("../hackathons/entities/hackathon.entity");
const submission_entity_1 = require("../submissions/entities/submission.entity");
const evaluation_entity_1 = require("../evaluations/entities/evaluation.entity");
const user_entity_1 = require("../users/entities/user.entity");
let DashboardService = class DashboardService {
    constructor(hackathonRepository, submissionRepository, evaluationRepository, userRepository) {
        this.hackathonRepository = hackathonRepository;
        this.submissionRepository = submissionRepository;
        this.evaluationRepository = evaluationRepository;
        this.userRepository = userRepository;
    }
    async getStatistics() {
        const [totalUsers, totalHackathons, totalSubmissions, totalEvaluations,] = await Promise.all([
            this.userRepository.count(),
            this.hackathonRepository.count(),
            this.submissionRepository.count(),
            this.evaluationRepository.count(),
        ]);
        const activeHackathons = await this.hackathonRepository.count({
            where: { status: hackathon_entity_1.HackathonStatus.ACTIVE },
        });
        return {
            totalUsers,
            totalHackathons,
            activeHackathons,
            totalSubmissions,
            totalEvaluations,
        };
    }
    async getRecentActivities() {
        const recentSubmissions = await this.submissionRepository.find({
            relations: ['team', 'team.hackathon'],
            order: { submittedAt: 'DESC' },
            take: 5,
        });
        const recentEvaluations = await this.evaluationRepository.find({
            relations: ['judge', 'submission'],
            order: { evaluatedAt: 'DESC' },
            take: 5,
        });
        return {
            recentSubmissions,
            recentEvaluations,
        };
    }
    async getHackathonMetrics() {
        const hackathons = await this.hackathonRepository.find();
        const metrics = [];
        for (const hackathon of hackathons) {
            const submissions = await this.submissionRepository.count({
                where: { team: { hackathonId: hackathon.id } }
            });
            const evaluations = await this.evaluationRepository
                .createQueryBuilder('evaluation')
                .leftJoin('evaluation.submission', 'submission')
                .leftJoin('submission.team', 'team')
                .where('team.hackathonId = :hackathonId', { hackathonId: hackathon.id })
                .getCount();
            metrics.push({
                hackathonId: hackathon.id,
                title: hackathon.title,
                status: hackathon.status,
                submissions,
                evaluations,
                participationRate: hackathon.maxTeamSize
                    ? (submissions / hackathon.maxTeamSize) * 100
                    : 0,
            });
        }
        return metrics;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hackathon_entity_1.Hackathon)),
    __param(1, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __param(2, (0, typeorm_1.InjectRepository)(evaluation_entity_1.Evaluation)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map