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
exports.JudgingCriteria = void 0;
const typeorm_1 = require("typeorm");
const hackathon_entity_1 = require("./hackathon.entity");
let JudgingCriteria = class JudgingCriteria {
};
exports.JudgingCriteria = JudgingCriteria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JudgingCriteria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JudgingCriteria.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], JudgingCriteria.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], JudgingCriteria.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], JudgingCriteria.prototype, "maxScore", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hackathon_entity_1.Hackathon, hackathon => hackathon.judgingCriteria),
    __metadata("design:type", hackathon_entity_1.Hackathon)
], JudgingCriteria.prototype, "hackathon", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JudgingCriteria.prototype, "hackathonId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], JudgingCriteria.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], JudgingCriteria.prototype, "updatedAt", void 0);
exports.JudgingCriteria = JudgingCriteria = __decorate([
    (0, typeorm_1.Entity)('judging_criteria')
], JudgingCriteria);
//# sourceMappingURL=judging-criteria.entity.js.map