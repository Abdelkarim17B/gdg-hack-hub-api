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
const user_entity_1 = require("../../users/entities/user.entity");
let TeamRegistrationService = class TeamRegistrationService {
    constructor(teamRepository, challengeRepository, hackathonRepository, UserRepository) {
        this.teamRepository = teamRepository;
        this.challengeRepository = challengeRepository;
        this.hackathonRepository = hackathonRepository;
        this.UserRepository = UserRepository;
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
        const providedChallengeIds = registrationData
            .map(data => data.challengeId)
            .filter(challengeId => challengeId !== null);
        if (providedChallengeIds.length > 0) {
            const uniqueChallengeIds = [...new Set(providedChallengeIds)];
            const challenges = await this.challengeRepository.findByIds(uniqueChallengeIds);
            const validChallengeIds = challenges.map(challenge => challenge.id);
            const invalidChallengeIds = uniqueChallengeIds.filter(id => !validChallengeIds.includes(id));
            if (invalidChallengeIds.length > 0) {
                console.error('Invalid challenge IDs:', invalidChallengeIds);
                throw new common_1.BadRequestException(`Invalid challenge IDs: ${invalidChallengeIds.join(', ')}`);
            }
        }
        const teams = registrationData.map(data => this.teamRepository.create({
            name: data.teamName,
            memberEmails: data.memberEmails,
            hackathonId,
            challengeId: data.challengeId,
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
    async getAllTeams(hackathonId, pagination) {
        try {
            const hackathon = await this.hackathonRepository.findOne({
                where: {
                    id: hackathonId
                }
            });
            if (!hackathon) {
                throw new common_1.NotFoundException('Hackathon not found');
            }
            const { page = 1, limit = 10 } = pagination;
            const [teams, total] = await this.teamRepository.findAndCount({
                where: { hackathonId },
                take: limit,
                skip: (page - 1) * limit
            });
            return {
                teams: teams,
                total,
                page,
                limit
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async addParticipantToTeam(hackathonId, teamId, participantId) {
        const user = await this.UserRepository.findOne({
            where: {
                id: participantId
            }
        });
        if (!user) {
            throw new common_1.NotFoundException('participant not found');
        }
        const alreadyNotInTeam = await this.validateTeamRegistration(hackathonId, [user.email]);
        if (!alreadyNotInTeam) {
            throw new common_1.BadRequestException('Participant is already registered in another team for this hackathon');
        }
        const team = await this.teamRepository.findOne({ where: { id: teamId, hackathonId } });
        if (!team) {
            throw new common_1.NotFoundException(`Team with ID ${teamId} not found in hackathon ${hackathonId}`);
        }
        if (team.memberEmails.includes(participantId)) {
            throw new common_1.BadRequestException(`Participant with ID ${participantId} is already in the team`);
        }
        team.memberEmails.push(participantId);
        await this.teamRepository.save(team);
    }
    async removeParticipantFromTeam(hackathonId, participantEmail) {
        const team = await this.teamRepository.findOne({
            where: {
                hackathonId,
                memberEmails: participantEmail
            }
        });
        if (!team) {
            throw new common_1.NotFoundException(`Participant with email ${participantEmail} is not in any team for hackathon ${hackathonId}`);
        }
        team.memberEmails = team.memberEmails.filter(email => email !== participantEmail);
        await this.teamRepository.save(team);
    }
    async getOneTeam(hackathonId, teamId) {
        const team = await this.teamRepository.findOne({
            where: { id: teamId, hackathonId }
        });
        if (!team) {
            throw new common_1.NotFoundException(`Team with ID ${teamId} not found in hackathon ${hackathonId}`);
        }
        return team;
    }
};
exports.TeamRegistrationService = TeamRegistrationService;
exports.TeamRegistrationService = TeamRegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __param(1, (0, typeorm_1.InjectRepository)(challenge_entity_1.Challenge)),
    __param(2, (0, typeorm_1.InjectRepository)(hackathon_entity_1.Hackathon)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TeamRegistrationService);
//# sourceMappingURL=team-registration.service.js.map