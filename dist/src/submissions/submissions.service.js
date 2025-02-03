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
exports.SubmissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const submission_entity_1 = require("./entities/submission.entity");
const role_enum_1 = require("../common/enums/role.enum");
const team_entity_1 = require("../hackathons/entities/team.entity");
let SubmissionsService = class SubmissionsService {
    constructor(submissionRepository, teamRepository) {
        this.submissionRepository = submissionRepository;
        this.teamRepository = teamRepository;
    }
    async create(createSubmissionDto, user) {
        const team = await this.teamRepository.findOne({
            where: { id: createSubmissionDto.teamId },
        });
        if (!team) {
            throw new common_1.NotFoundException(`Team not found`);
        }
        if (!team.memberEmails.includes(user.email)) {
            throw new common_1.ForbiddenException('You must be a team member to submit');
        }
        const submission = this.submissionRepository.create(Object.assign(Object.assign({}, createSubmissionDto), { team: team }));
        return await this.submissionRepository.save(submission);
    }
    async findAll(query, pagination, user) {
        const queryBuilder = this.submissionRepository.createQueryBuilder('submission')
            .leftJoinAndSelect('submission.team', 'team')
            .leftJoinAndSelect('team.hackathon', 'hackathon')
            .leftJoinAndSelect('team.challenge', 'challenge');
        if ((user === null || user === void 0 ? void 0 : user.role) === role_enum_1.Role.PARTICIPANT) {
            queryBuilder.where('team.memberEmails LIKE :email', { email: `%${user.email}%` });
        }
        if (query.teamId) {
            queryBuilder.andWhere('submission.team = :team', {
                team: { id: query.teamId },
            });
        }
        if (query.status) {
            queryBuilder.andWhere('submission.status = :status', {
                status: query.status,
            });
        }
        if (query.search) {
            queryBuilder.andWhere('(submission.title ILIKE :search OR submission.description ILIKE :search)', { search: `%${query.search}%` });
        }
        const skip = (pagination.page - 1) * pagination.limit;
        queryBuilder.skip(skip).take(pagination.limit);
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
        const submission = await this.submissionRepository.findOne({
            where: { id },
            relations: ['team', 'team.hackathon', 'team.challenge'],
        });
        if (!submission) {
            throw new common_1.NotFoundException(`Submission with ID ${id} not found`);
        }
        if (user.role === role_enum_1.Role.PARTICIPANT && !submission.team.memberEmails.includes(user.email)) {
            throw new common_1.ForbiddenException("You can only access your team's submissions");
        }
        return submission;
    }
    async update(id, updateSubmissionDto, user) {
        const submission = await this.findOne(id, user);
        if (user.role === role_enum_1.Role.PARTICIPANT && !submission.team.memberEmails.includes(user.email)) {
            throw new common_1.ForbiddenException("You can only update your team's submissions");
        }
        Object.assign(submission, updateSubmissionDto);
        return await this.submissionRepository.save(submission);
    }
    async remove(id, user) {
        const submission = await this.findOne(id, user);
        if (user.role === role_enum_1.Role.PARTICIPANT && !submission.team.memberEmails.includes(user.email)) {
            throw new common_1.ForbiddenException("You can only delete your team's submissions");
        }
        await this.submissionRepository.remove(submission);
    }
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __param(1, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubmissionsService);
//# sourceMappingURL=submissions.service.js.map