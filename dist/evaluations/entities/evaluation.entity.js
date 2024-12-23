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
exports.Evaluation = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const submission_entity_1 = require("../../submissions/entities/submission.entity");
const judging_criteria_entity_1 = require("../../hackathons/entities/judging-criteria.entity");
let Evaluation = class Evaluation {
};
exports.Evaluation = Evaluation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Evaluation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => submission_entity_1.Submission, submission => submission.evaluations),
    (0, typeorm_1.JoinColumn)({ name: 'submission_id' }),
    __metadata("design:type", submission_entity_1.Submission)
], Evaluation.prototype, "submission", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evaluation.prototype, "submissionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.evaluations),
    (0, typeorm_1.JoinColumn)({ name: 'judge_id' }),
    __metadata("design:type", user_entity_1.User)
], Evaluation.prototype, "judge", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evaluation.prototype, "judgeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => judging_criteria_entity_1.JudgingCriteria),
    (0, typeorm_1.JoinColumn)({ name: 'criteria_id' }),
    __metadata("design:type", judging_criteria_entity_1.JudgingCriteria)
], Evaluation.prototype, "criteria", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evaluation.prototype, "criteriaId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Evaluation.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Evaluation.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Evaluation.prototype, "evaluatedAt", void 0);
exports.Evaluation = Evaluation = __decorate([
    (0, typeorm_1.Entity)('evaluations')
], Evaluation);
//# sourceMappingURL=evaluation.entity.js.map