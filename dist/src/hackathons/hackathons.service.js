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
exports.HackathonsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hackathon_entity_1 = require("./entities/hackathon.entity");
let HackathonsService = class HackathonsService {
    constructor(hackathonRepository) {
        this.hackathonRepository = hackathonRepository;
    }
    async create(createHackathonDto) {
        const hackathon = this.hackathonRepository.create(createHackathonDto);
        return await this.hackathonRepository.save(hackathon);
    }
    async findAll(query, pagination) {
        try {
            const queryBuilder = this.hackathonRepository.createQueryBuilder('hackathon');
            if (query.search) {
                queryBuilder.where('hackathon.title ILIKE :search OR hackathon.description ILIKE :search', {
                    search: `%${query.search}%`,
                });
            }
            if (query.status) {
                queryBuilder.andWhere('hackathon.status = :status', { status: query.status });
            }
            if (query.sortBy) {
                queryBuilder.orderBy(`hackathon.${query.sortBy}`, query.sortOrder || 'ASC');
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
        catch (error) {
            console.log(`Failed to find hackathons: ${error.message}`);
            throw new Error(`Failed to find hackathons: ${error.message}`);
        }
    }
    async findOne(id) {
        const hackathon = await this.hackathonRepository.findOne({ where: { id } });
        if (!hackathon) {
            throw new common_1.NotFoundException(`Hackathon with ID ${id} not found`);
        }
        return hackathon;
    }
    async update(id, updateHackathonDto) {
        const hackathon = await this.findOne(id);
        Object.assign(hackathon, updateHackathonDto);
        return await this.hackathonRepository.save(hackathon);
    }
    async remove(id) {
        const result = await this.hackathonRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Hackathon with ID ${id} not found`);
        }
    }
};
exports.HackathonsService = HackathonsService;
exports.HackathonsService = HackathonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hackathon_entity_1.Hackathon)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HackathonsService);
//# sourceMappingURL=hackathons.service.js.map