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
exports.ChallengeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const challenge_service_1 = require("../services/challenge.service");
const challenge_dto_1 = require("../dto/challenge.dto");
let ChallengeController = class ChallengeController {
    constructor(challengeService) {
        this.challengeService = challengeService;
    }
    async createChallenge(hackathonId, createChallengeDto) {
        return this.challengeService.create(createChallengeDto, hackathonId);
    }
    async getAllChallenges(hackathonId, pagination) {
        return this.challengeService.findAll(hackathonId, pagination);
    }
    async getChallenge(hackathonId, challengeId) {
        return this.challengeService.findOne(challengeId);
    }
    async updateChallenge(id, updateChallengeDto) {
        return this.challengeService.update(updateChallengeDto, id);
    }
    async deleteChallenge(challengeId) {
        return this.challengeService.delete(challengeId);
    }
};
exports.ChallengeController = ChallengeController;
__decorate([
    (0, common_1.Post)(''),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new challenge' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Challenge has been created successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    (0, swagger_1.ApiBody)({ type: challenge_dto_1.CreateChallengeDto }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, challenge_dto_1.CreateChallengeDto]),
    __metadata("design:returntype", Promise)
], ChallengeController.prototype, "createChallenge", null);
__decorate([
    (0, common_1.Get)(''),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all challenges' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Challenges retrieved successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ChallengeController.prototype, "getAllChallenges", null);
__decorate([
    (0, common_1.Get)(':challengeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single challenge' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Challenge retrieved successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    (0, swagger_1.ApiParam)({ name: 'challengeId', required: true }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __param(1, (0, common_1.Param)('challengeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChallengeController.prototype, "getChallenge", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing challenge' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Challenge has been updated successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true }),
    (0, swagger_1.ApiBody)({ type: challenge_dto_1.UpdateChallengeDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, challenge_dto_1.UpdateChallengeDto]),
    __metadata("design:returntype", Promise)
], ChallengeController.prototype, "updateChallenge", null);
__decorate([
    (0, common_1.Delete)(':challengeId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a single challenge' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Challenge deleted successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    (0, swagger_1.ApiParam)({ name: 'challengeId', required: true }),
    __param(0, (0, common_1.Param)('challengeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengeController.prototype, "deleteChallenge", null);
exports.ChallengeController = ChallengeController = __decorate([
    (0, swagger_1.ApiTags)('challenge'),
    (0, common_1.Controller)('hackathons/:hackathonId/challenge'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [challenge_service_1.ChallengeService])
], ChallengeController);
//# sourceMappingURL=challenge.controller.js.map