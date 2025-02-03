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
exports.WinnersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const winner_determination_service_1 = require("../services/winner-determination.service");
let WinnersController = class WinnersController {
    constructor(winnerService) {
        this.winnerService = winnerService;
    }
    async getWinners(hackathonId) {
        return this.winnerService.determineWinners(hackathonId);
    }
    async getWinnersByChallenge(hackathonId) {
        return this.winnerService.getWinnersByChallenge(hackathonId);
    }
};
exports.WinnersController = WinnersController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.JUDGE),
    (0, swagger_1.ApiOperation)({ summary: 'Get all winners ranked by score' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns ranked list of all teams with scores.'
    }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WinnersController.prototype, "getWinners", null);
__decorate([
    (0, common_1.Get)('by-challenge'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.JUDGE),
    (0, swagger_1.ApiOperation)({ summary: 'Get winners grouped by challenge' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns winners grouped by challenge.'
    }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WinnersController.prototype, "getWinnersByChallenge", null);
exports.WinnersController = WinnersController = __decorate([
    (0, swagger_1.ApiTags)('winners'),
    (0, common_1.Controller)('hackathons/:hackathonId/winners'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [winner_determination_service_1.WinnerDeterminationService])
], WinnersController);
//# sourceMappingURL=winners.controller.js.map