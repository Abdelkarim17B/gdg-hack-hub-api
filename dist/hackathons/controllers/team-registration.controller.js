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
exports.TeamRegistrationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const team_registration_service_1 = require("../services/team-registration.service");
const team_registration_dto_1 = require("../dto/team-registration.dto");
let TeamRegistrationController = class TeamRegistrationController {
    constructor(teamRegistrationService) {
        this.teamRegistrationService = teamRegistrationService;
    }
    async registerTeams(hackathonId, bulkRegistrationDto) {
        return this.teamRegistrationService.registerTeamsFromSheet(hackathonId, bulkRegistrationDto.teams);
    }
    async validateEmails(hackathonId, emails) {
        return this.teamRegistrationService.validateTeamRegistration(hackathonId, emails);
    }
};
exports.TeamRegistrationController = TeamRegistrationController;
__decorate([
    (0, common_1.Post)('register-bulk'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Register multiple teams from sheet data' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Teams have been registered successfully.'
    }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, team_registration_dto_1.BulkTeamRegistrationDto]),
    __metadata("design:returntype", Promise)
], TeamRegistrationController.prototype, "registerTeams", null);
__decorate([
    (0, common_1.Get)('validate-emails'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Validate if emails are available for team registration' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns true if all emails are available.'
    }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __param(1, (0, common_1.Body)('emails')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], TeamRegistrationController.prototype, "validateEmails", null);
exports.TeamRegistrationController = TeamRegistrationController = __decorate([
    (0, swagger_1.ApiTags)('teams'),
    (0, common_1.Controller)('hackathons/:hackathonId/teams'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [team_registration_service_1.TeamRegistrationService])
], TeamRegistrationController);
//# sourceMappingURL=team-registration.controller.js.map