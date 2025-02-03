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
exports.EvaluationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const evaluation_entity_1 = require("./entities/evaluation.entity");
const role_enum_1 = require("../common/enums/role.enum");
const judging_criteria_entity_1 = require("../hackathons/entities/judging-criteria.entity");
const judge_assignment_entity_1 = require("../hackathons/entities/judge-assignment.entity");
const submission_entity_1 = require("../submissions/entities/submission.entity");
let EvaluationsService = class EvaluationsService {
    constructor(evaluationRepository, judgingCriteriaRepository, judgeAssignmentRepository, submissionRepository) {
        this.evaluationRepository = evaluationRepository;
        this.judgingCriteriaRepository = judgingCriteriaRepository;
        this.judgeAssignmentRepository = judgeAssignmentRepository;
        this.submissionRepository = submissionRepository;
    }
    async create(createEvaluationDto, user) {
        const criteria = await this.judgingCriteriaRepository.findOne({
            where: { id: createEvaluationDto.criteriaId },
            relations: ['hackathon'],
        });
        if (!criteria) {
            throw new common_1.NotFoundException('Judging criteria not found');
        }
        const assignment = await this.judgeAssignmentRepository.findOne({
            where: {
                judge: { id: user.id },
                hackathon: { id: criteria.hackathon.id },
            },
        });
        if (!assignment) {
            throw new common_1.ForbiddenException('You are not assigned as a judge for this hackathon');
        }
        if (createEvaluationDto.score < 0 || createEvaluationDto.score > criteria.maxScore) {
            throw new common_1.ForbiddenException(`Score must be between 0 and ${criteria.maxScore}`);
        }
        const submission = await this.submissionRepository.findOne({
            where: { id: createEvaluationDto.submissionId },
        });
        if (!submission) {
            throw new common_1.NotFoundException('Submission not found');
        }
        const evaluation = this.evaluationRepository.create({
            submission: submission,
            judge: user,
            criteria: criteria,
            score: createEvaluationDto.score,
            feedback: createEvaluationDto.feedback,
        });
        return await this.evaluationRepository.save(evaluation);
    }
    async findAll(query, pagination, user) {
        const queryBuilder = this.evaluationRepository.createQueryBuilder('evaluation')
            .leftJoinAndSelect('evaluation.judge', 'judge')
            .leftJoinAndSelect('evaluation.submission', 'submission')
            .leftJoinAndSelect('evaluation.criteria', 'criteria')
            .leftJoinAndSelect('submission.team', 'team')
            .leftJoinAndSelect('team.hackathon', 'hackathon');
        if ((user === null || user === void 0 ? void 0 : user.role) === role_enum_1.Role.JUDGE) {
            queryBuilder.where('evaluation.judge = :judge', { judge: user });
        }
        if (query.submissionId) {
            queryBuilder.andWhere('evaluation.submission = :submission', {
                submission: { id: query.submissionId },
            });
        }
        if (query.judgeId) {
            queryBuilder.andWhere('evaluation.judge = :judge', {
                judge: { id: query.judgeId },
            });
        }
        const skip = (pagination.page - 1) * pagination.limit;
        queryBuilder.skip(skip).take(pagination.limit);
        queryBuilder.orderBy('evaluation.evaluatedAt', 'DESC');
        const [items, total] = await queryBuilder.getManyAndCount();
        return {
            items,
            total,
            page: pagination.page,
            limit: pagination.limit,
            pages: Math.ceil(total / pagination.limit),
        };
    }
    async findOne(id, user) {
        const evaluation = await this.evaluationRepository.findOne({
            where: { id },
            relations: ['judge', 'submission', 'criteria', 'submission.team', 'submission.team.hackathon'],
        });
        if (!evaluation) {
            throw new common_1.NotFoundException(`Evaluation with ID ${id} not found`);
        }
        if (user.role === role_enum_1.Role.JUDGE && evaluation.judge.id !== user.id) {
            throw new common_1.ForbiddenException('You can only access your own evaluations');
        }
        return evaluation;
    }
    async update(id, updateEvaluationDto, user) {
        const evaluation = await this.findOne(id, user);
        if (user.role === role_enum_1.Role.JUDGE && evaluation.judge.id !== user.id) {
            throw new common_1.ForbiddenException('You can only update your own evaluations');
        }
        if (updateEvaluationDto.score !== undefined) {
            const criteria = await this.judgingCriteriaRepository.findOne({
                where: { id: evaluation.criteria.id },
            });
            if (!criteria) {
                throw new common_1.NotFoundException('Judging criteria not found');
            }
            if (updateEvaluationDto.score < 0 || updateEvaluationDto.score > criteria.maxScore) {
                throw new common_1.ForbiddenException(`Score must be between 0 and ${criteria.maxScore}`);
            }
        }
        Object.assign(evaluation, updateEvaluationDto);
        return await this.evaluationRepository.save(evaluation);
    }
    async remove(id, user) {
        const evaluation = await this.findOne(id, user);
        if (user.role === role_enum_1.Role.JUDGE && evaluation.judge.id !== user.id) {
            throw new common_1.ForbiddenException('You can only delete your own evaluations');
        }
        await this.evaluationRepository.remove(evaluation);
    }
};
exports.EvaluationsService = EvaluationsService;
exports.EvaluationsService = EvaluationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evaluation_entity_1.Evaluation)),
    __param(1, (0, typeorm_1.InjectRepository)(judging_criteria_entity_1.JudgingCriteria)),
    __param(2, (0, typeorm_1.InjectRepository)(judge_assignment_entity_1.JudgeAssignment)),
    __param(3, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EvaluationsService);
//# sourceMappingURL=evaluations.service.js.map