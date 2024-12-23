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
exports.Hackathon = exports.HackathonStatus = void 0;
const typeorm_1 = require("typeorm");
const challenge_entity_1 = require("./challenge.entity");
const team_entity_1 = require("./team.entity");
const judge_assignment_entity_1 = require("./judge-assignment.entity");
const judging_criteria_entity_1 = require("./judging-criteria.entity");
var HackathonStatus;
(function (HackathonStatus) {
    HackathonStatus["DRAFT"] = "draft";
    HackathonStatus["REGISTRATION"] = "registration";
    HackathonStatus["ACTIVE"] = "active";
    HackathonStatus["JUDGING"] = "judging";
    HackathonStatus["COMPLETED"] = "completed";
})(HackathonStatus || (exports.HackathonStatus = HackathonStatus = {}));
let Hackathon = class Hackathon {
};
exports.Hackathon = Hackathon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Hackathon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hackathon.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Hackathon.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], Hackathon.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], Hackathon.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], Hackathon.prototype, "registrationDeadline", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Hackathon.prototype, "maxTeamSize", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Hackathon.prototype, "minTeamSize", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        enum: HackathonStatus,
        default: HackathonStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Hackathon.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Hackathon.prototype, "rules", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Hackathon.prototype, "prizes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => challenge_entity_1.Challenge, challenge => challenge.hackathon),
    __metadata("design:type", Array)
], Hackathon.prototype, "challenges", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_entity_1.Team, team => team.hackathon),
    __metadata("design:type", Array)
], Hackathon.prototype, "teams", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => judge_assignment_entity_1.JudgeAssignment, assignment => assignment.hackathon),
    __metadata("design:type", Array)
], Hackathon.prototype, "judgeAssignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => judging_criteria_entity_1.JudgingCriteria, criteria => criteria.hackathon),
    __metadata("design:type", Array)
], Hackathon.prototype, "judgingCriteria", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Hackathon.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Hackathon.prototype, "updatedAt", void 0);
exports.Hackathon = Hackathon = __decorate([
    (0, typeorm_1.Entity)('hackathons')
], Hackathon);
//# sourceMappingURL=hackathon.entity.js.map