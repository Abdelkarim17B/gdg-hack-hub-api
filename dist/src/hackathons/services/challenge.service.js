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
exports.ChallengeService = void 0;
const challenge_entity_1 = require("./../entities/challenge.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hackathon_entity_1 = require("../entities/hackathon.entity");
let ChallengeService = class ChallengeService {
    constructor(ChallengeRepository, HackathonRepository) {
        this.ChallengeRepository = ChallengeRepository;
        this.HackathonRepository = HackathonRepository;
    }
    async create(CreateChallengeDto, hackathonId) {
        const hackathon = await this.HackathonRepository.findOne({ where: { id: hackathonId } });
        if (!hackathon) {
            throw new common_1.NotFoundException('Hackathon not found');
        }
        const challenge = this.ChallengeRepository.create(Object.assign(Object.assign({}, CreateChallengeDto), { hackathon: hackathon }));
        return await this.ChallengeRepository.save(challenge);
    }
    async findAll(hackathonId, pagination) {
        const { page = 1, limit = 10 } = pagination;
        const [challenges, total] = await this.ChallengeRepository.findAndCount({
            where: { hackathon: { id: hackathonId } },
            take: limit,
            skip: (page - 1) * limit,
        });
        return {
            challenges: challenges,
            total,
            page,
            limit,
        };
    }
    async findOne(challengeId) {
        const challenge = await this.ChallengeRepository.findOne({
            where: {
                id: challengeId,
            },
            relations: ['hackathon'],
        });
        if (!challenge) {
            throw new common_1.NotFoundException('Challenge not found');
        }
        return challenge;
    }
    async update(updateChallengeDto, id) {
        const challenge = await this.ChallengeRepository.findOne({ where: { id }, relations: ['hackathon'] });
        if (!challenge) {
            throw new common_1.NotFoundException('Challenge not found');
        }
        Object.assign(challenge, updateChallengeDto);
        return await this.ChallengeRepository.save(challenge);
    }
    async delete(challengeId) {
        const challenge = await this.ChallengeRepository.findOne({
            where: {
                id: challengeId,
            },
        });
        if (!challenge) {
            throw new common_1.NotFoundException('Challenge not found');
        }
        await this.ChallengeRepository.remove(challenge);
        return challenge;
    }
};
exports.ChallengeService = ChallengeService;
exports.ChallengeService = ChallengeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(challenge_entity_1.Challenge)),
    __param(1, (0, typeorm_1.InjectRepository)(hackathon_entity_1.Hackathon)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChallengeService);
//# sourceMappingURL=challenge.service.js.map