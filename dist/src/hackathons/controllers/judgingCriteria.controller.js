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
exports.JudgingCriteriaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const judgingCriteria_service_1 = require("../services/judgingCriteria.service");
const judging_criteria_dto_1 = require("../dto/judging-criteria.dto");
let JudgingCriteriaController = class JudgingCriteriaController {
    constructor(judgingCriteriaService) {
        this.judgingCriteriaService = judgingCriteriaService;
    }
    async createjudgingCriteria(hackathonId, createjudgingCriteriaDto) {
        return this.judgingCriteriaService.create(createjudgingCriteriaDto, hackathonId);
    }
    async getAlljudgingCriterias(hackathonId, pagination) {
        return this.judgingCriteriaService.findAll(hackathonId, pagination);
    }
    async getjudgingCriteria(hackathonId, judgingCriteriaId) {
        return this.judgingCriteriaService.findOne(judgingCriteriaId);
    }
    async updatejudgingCriteria(id, updatejudgingCriteriaDto) {
        return this.judgingCriteriaService.update(updatejudgingCriteriaDto, id);
    }
    async deletejudgingCriteria(judgingCriteriaId) {
        return this.judgingCriteriaService.delete(judgingCriteriaId);
    }
};
exports.JudgingCriteriaController = JudgingCriteriaController;
__decorate([
    (0, common_1.Post)(''),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new judgingCriteria' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'judgingCriteria has been created successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    (0, swagger_1.ApiBody)({ type: judging_criteria_dto_1.CreateJudgingCriteriaDto }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, judging_criteria_dto_1.CreateJudgingCriteriaDto]),
    __metadata("design:returntype", Promise)
], JudgingCriteriaController.prototype, "createjudgingCriteria", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Get all judgingCriterias' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'judgingCriterias retrieved successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], JudgingCriteriaController.prototype, "getAlljudgingCriterias", null);
__decorate([
    (0, common_1.Get)(':judgingCriteriaId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single judgingCriteria' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'judgingCriteria retrieved successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    (0, swagger_1.ApiParam)({ name: 'judgingCriteriaId', required: true }),
    __param(0, (0, common_1.Param)('hackathonId')),
    __param(1, (0, common_1.Param)('judgingCriteriaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JudgingCriteriaController.prototype, "getjudgingCriteria", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing judgingCriteria' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'judgingCriteria has been updated successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true }),
    (0, swagger_1.ApiBody)({ type: judging_criteria_dto_1.CreateJudgingCriteriaDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, judging_criteria_dto_1.CreateJudgingCriteriaDto]),
    __metadata("design:returntype", Promise)
], JudgingCriteriaController.prototype, "updatejudgingCriteria", null);
__decorate([
    (0, common_1.Delete)(':judgingCriteriaId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a single judgingCriteria' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'judgingCriteria deleted successfully.'
    }),
    (0, swagger_1.ApiParam)({ name: 'hackathonId', required: true }),
    (0, swagger_1.ApiParam)({ name: 'judgingCriteriaId', required: true }),
    __param(0, (0, common_1.Param)('judgingCriteriaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JudgingCriteriaController.prototype, "deletejudgingCriteria", null);
exports.JudgingCriteriaController = JudgingCriteriaController = __decorate([
    (0, swagger_1.ApiTags)('judgingCriteria'),
    (0, common_1.Controller)('hackathons/:hackathonId/judgingCriteria'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [judgingCriteria_service_1.JudgingCriteriaService])
], JudgingCriteriaController);
//# sourceMappingURL=judgingCriteria.controller.js.map