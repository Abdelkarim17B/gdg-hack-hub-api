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
exports.TeamRegistrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const team_entity_1 = require("../entities/team.entity");
const challenge_entity_1 = require("../entities/challenge.entity");
const hackathon_entity_1 = require("../entities/hackathon.entity");
let TeamRegistrationService = class TeamRegistrationService {
    constructor(teamRepository, challengeRepository, hackathonRepository) {
        this.teamRepository = teamRepository;
        this.challengeRepository = challengeRepository;
        this.hackathonRepository = hackathonRepository;
    }
    async registerTeamsFromSheet(hackathonId, registrationData) {
        const hackathon = await this.hackathonRepository.findOne({
            where: { id: hackathonId }
        });
        if (!hackathon) {
            throw new common_1.BadRequestException(`Hackathon with ID ${hackathonId} not found`);
        }
        for (const data of registrationData) {
            if (data.memberEmails.length < hackathon.minTeamSize ||
                data.memberEmails.length > hackathon.maxTeamSize) {
                throw new common_1.BadRequestException(`Team ${data.teamName} size must be between ${hackathon.minTeamSize} and ${hackathon.maxTeamSize}`);
            }
        }
        const challengeIds = [...new Set(registrationData.map(data => data.challengeId))];
        const challenges = await this.challengeRepository.findByIds(challengeIds);
        if (challenges.length !== challengeIds.length) {
            throw new common_1.BadRequestException('One or more challenge IDs are invalid');
        }
        const teams = registrationData.map(data => this.teamRepository.create({
            name: data.teamName,
            memberEmails: data.memberEmails,
            hackathonId,
            challengeId: data.challengeId
        }));
        return await this.teamRepository.save(teams);
    }
    async validateTeamRegistration(hackathonId, memberEmails) {
        const existingTeams = await this.teamRepository.find({
            where: { hackathonId }
        });
        const registeredEmails = new Set(existingTeams.flatMap(team => team.memberEmails));
        return !memberEmails.some(email => registeredEmails.has(email));
    }
};
exports.TeamRegistrationService = TeamRegistrationService;
exports.TeamRegistrationService = TeamRegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __param(1, (0, typeorm_1.InjectRepository)(challenge_entity_1.Challenge)),
    __param(2, (0, typeorm_1.InjectRepository)(hackathon_entity_1.Hackathon)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TeamRegistrationService);
//# sourceMappingURL=team-registration.service.js.map