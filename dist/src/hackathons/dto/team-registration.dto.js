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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeParticipantFromTeamDto = exports.AddParticipantToTeamDto = exports.BodySchemaDto = exports.BulkTeamRegistrationDto = exports.TeamRegistrationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class TeamRegistrationDto {
}
exports.TeamRegistrationDto = TeamRegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamRegistrationDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEmail)({}, { each: true }),
    __metadata("design:type", Array)
], TeamRegistrationDto.prototype, "memberEmails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TeamRegistrationDto.prototype, "challengeId", void 0);
class BulkTeamRegistrationDto {
}
exports.BulkTeamRegistrationDto = BulkTeamRegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TeamRegistrationDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(100),
    __metadata("design:type", Array)
], BulkTeamRegistrationDto.prototype, "teams", void 0);
class BodySchemaDto {
}
exports.BodySchemaDto = BodySchemaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], description: 'List of emails to validate' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], BodySchemaDto.prototype, "emails", void 0);
class AddParticipantToTeamDto {
}
exports.AddParticipantToTeamDto = AddParticipantToTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AddParticipantToTeamDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AddParticipantToTeamDto.prototype, "participantId", void 0);
class removeParticipantFromTeamDto {
}
exports.removeParticipantFromTeamDto = removeParticipantFromTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], removeParticipantFromTeamDto.prototype, "participantEmail", void 0);
//# sourceMappingURL=team-registration.dto.js.map