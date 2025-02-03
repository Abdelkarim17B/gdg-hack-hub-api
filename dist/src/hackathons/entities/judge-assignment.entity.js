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
exports.JudgeAssignment = void 0;
const typeorm_1 = require("typeorm");
const hackathon_entity_1 = require("./hackathon.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let JudgeAssignment = class JudgeAssignment {
};
exports.JudgeAssignment = JudgeAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JudgeAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hackathon_entity_1.Hackathon, hackathon => hackathon.judgeAssignments),
    __metadata("design:type", hackathon_entity_1.Hackathon)
], JudgeAssignment.prototype, "hackathon", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JudgeAssignment.prototype, "hackathonId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.judgeAssignments),
    __metadata("design:type", user_entity_1.User)
], JudgeAssignment.prototype, "judge", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JudgeAssignment.prototype, "judgeId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], JudgeAssignment.prototype, "assignedAt", void 0);
exports.JudgeAssignment = JudgeAssignment = __decorate([
    (0, typeorm_1.Entity)('judge_assignments')
], JudgeAssignment);
//# sourceMappingURL=judge-assignment.entity.js.map