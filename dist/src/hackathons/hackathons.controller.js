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
exports.HackathonsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hackathons_service_1 = require("./hackathons.service");
const create_hackathon_dto_1 = require("./dto/create-hackathon.dto");
const update_hackathon_dto_1 = require("./dto/update-hackathon.dto");
const query_hackathon_dto_1 = require("./dto/query-hackathon.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const public_decorator_1 = require("../common/decorators/public.decorator");
let HackathonsController = class HackathonsController {
    constructor(hackathonsService) {
        this.hackathonsService = hackathonsService;
    }
    create(createHackathonDto) {
        return this.hackathonsService.create(createHackathonDto);
    }
    findAll(query, pagination) {
        return this.hackathonsService.findAll(query, pagination);
    }
    findOne(id) {
        return this.hackathonsService.findOne(id);
    }
    update(id, updateHackathonDto) {
        return this.hackathonsService.update(id, updateHackathonDto);
    }
    remove(id) {
        return this.hackathonsService.remove(id);
    }
};
exports.HackathonsController = HackathonsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new hackathon' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The hackathon has been created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hackathon_dto_1.CreateHackathonDto]),
    __metadata("design:returntype", void 0)
], HackathonsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all hackathons' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all hackathons.' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_hackathon_dto_1.QueryHackathonDto, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], HackathonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get a hackathon by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the hackathon.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HackathonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a hackathon' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The hackathon has been updated.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hackathon_dto_1.UpdateHackathonDto]),
    __metadata("design:returntype", void 0)
], HackathonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a hackathon' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The hackathon has been deleted.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HackathonsController.prototype, "remove", null);
exports.HackathonsController = HackathonsController = __decorate([
    (0, swagger_1.ApiTags)('hackathons'),
    (0, common_1.Controller)('hackathons'),
    __metadata("design:paramtypes", [hackathons_service_1.HackathonsService])
], HackathonsController);
//# sourceMappingURL=hackathons.controller.js.map