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
exports.WinnerDeterminationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const team_entity_1 = require("../entities/team.entity");
const submission_entity_1 = require("../../submissions/entities/submission.entity");
const evaluation_entity_1 = require("../../evaluations/entities/evaluation.entity");
const judging_criteria_entity_1 = require("../entities/judging-criteria.entity");
let WinnerDeterminationService = class WinnerDeterminationService {
    constructor(teamRepository, submissionRepository, evaluationRepository, judgingCriteriaRepository) {
        this.teamRepository = teamRepository;
        this.submissionRepository = submissionRepository;
        this.evaluationRepository = evaluationRepository;
        this.judgingCriteriaRepository = judgingCriteriaRepository;
    }
    async determineWinners(hackathonId) {
        const teams = await this.teamRepository.find({
            where: { hackathonId },
            relations: ['submissions', 'submissions.evaluations', 'challenge']
        });
        const criteria = await this.judgingCriteriaRepository.find({
            where: { hackathonId }
        });
        const teamScores = [];
        for (const team of teams) {
            const latestSubmission = team.submissions
                .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())[0];
            if (!latestSubmission)
                continue;
            const criteriaScores = await Promise.all(criteria.map(async (criterion) => {
                const evaluations = await this.evaluationRepository.find({
                    where: {
                        submissionId: latestSubmission.id,
                        criteriaId: criterion.id
                    }
                });
                const avgScore = evaluations.length > 0
                    ? evaluations.reduce((acc, evaluation) => acc + evaluation.score, 0) / evaluations.length
                    : 0;
                return {
                    criteriaId: criterion.id,
                    criteriaName: criterion.name,
                    score: avgScore,
                    weight: criterion.weight
                };
            }));
            const totalScore = criteriaScores.reduce((sum, { score, weight }) => sum + (score * weight), 0);
            teamScores.push({
                teamId: team.id,
                teamName: team.name,
                challengeId: team.challengeId,
                totalScore,
                criteriaScores
            });
        }
        return teamScores.sort((a, b) => b.totalScore - a.totalScore);
    }
    async getWinnersByChallenge(hackathonId) {
        const allScores = await this.determineWinners(hackathonId);
        const winnersByChallenge = {};
        allScores.forEach(score => {
            if (!winnersByChallenge[score.challengeId]) {
                winnersByChallenge[score.challengeId] = [];
            }
            winnersByChallenge[score.challengeId].push(score);
        });
        Object.values(winnersByChallenge).forEach(teams => {
            teams.sort((a, b) => b.totalScore - a.totalScore);
        });
        return winnersByChallenge;
    }
};
exports.WinnerDeterminationService = WinnerDeterminationService;
exports.WinnerDeterminationService = WinnerDeterminationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __param(1, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __param(2, (0, typeorm_1.InjectRepository)(evaluation_entity_1.Evaluation)),
    __param(3, (0, typeorm_1.InjectRepository)(judging_criteria_entity_1.JudgingCriteria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WinnerDeterminationService);
//# sourceMappingURL=winner-determination.service.js.map