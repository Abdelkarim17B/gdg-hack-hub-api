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
exports.JudgingCriteriaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const judging_criteria_entity_1 = require("../entities/judging-criteria.entity");
let JudgingCriteriaService = class JudgingCriteriaService {
    constructor(JudgingCriteriaRepository) {
        this.JudgingCriteriaRepository = JudgingCriteriaRepository;
    }
    async create(CreateJudgingCriteriaDto, hackathonId) {
        const JudgingCriteria = this.JudgingCriteriaRepository.create(Object.assign(Object.assign({}, CreateJudgingCriteriaDto), { hackathonId: hackathonId }));
        return await this.JudgingCriteriaRepository.save(JudgingCriteria);
    }
    async findAll(hackathonId, pagination) {
        const { page = 1, limit = 10 } = pagination;
        const [JudgingCriterias, total] = await this.JudgingCriteriaRepository.findAndCount({
            where: { hackathonId },
            take: limit,
            skip: (page - 1) * limit
        });
        return {
            JudgingCriterias: JudgingCriterias,
            total,
            page,
            limit
        };
    }
    async findOne(JudgingCriteriaId) {
        const JudgingCriteria = await this.JudgingCriteriaRepository.findOne({
            where: {
                id: JudgingCriteriaId
            }
        });
        if (!JudgingCriteria) {
            throw new common_1.NotFoundException('JudgingCriteria not found');
        }
        return JudgingCriteria;
    }
    async update(updateJudgingCriteriaDto, id) {
        const JudgingCriteria = await this.JudgingCriteriaRepository.findOne({ where: { id } });
        if (!JudgingCriteria) {
            throw new common_1.NotFoundException('JudgingCriteria not found');
        }
        Object.assign(JudgingCriteria, updateJudgingCriteriaDto);
        return await this.JudgingCriteriaRepository.save(JudgingCriteria);
    }
    async delete(JudgingCriteriaId) {
        const JudgingCriteria = await this.JudgingCriteriaRepository.findOne({
            where: {
                id: JudgingCriteriaId
            }
        });
        if (!JudgingCriteria) {
            throw new common_1.NotFoundException('JudgingCriteria not found');
        }
        await this.JudgingCriteriaRepository.remove(JudgingCriteria);
        return JudgingCriteria;
    }
};
exports.JudgingCriteriaService = JudgingCriteriaService;
exports.JudgingCriteriaService = JudgingCriteriaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(judging_criteria_entity_1.JudgingCriteria)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JudgingCriteriaService);
//# sourceMappingURL=judgingCriteria.service.js.map