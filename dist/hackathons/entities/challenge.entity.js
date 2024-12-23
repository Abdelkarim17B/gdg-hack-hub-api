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
exports.Challenge = void 0;
const typeorm_1 = require("typeorm");
const hackathon_entity_1 = require("./hackathon.entity");
const team_entity_1 = require("./team.entity");
let Challenge = class Challenge {
};
exports.Challenge = Challenge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Challenge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Challenge.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Challenge.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Challenge.prototype, "criteria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hackathon_entity_1.Hackathon, hackathon => hackathon.challenges),
    __metadata("design:type", hackathon_entity_1.Hackathon)
], Challenge.prototype, "hackathon", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Challenge.prototype, "hackathonId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_entity_1.Team, team => team.challenge),
    __metadata("design:type", Array)
], Challenge.prototype, "teams", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Challenge.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Challenge.prototype, "updatedAt", void 0);
exports.Challenge = Challenge = __decorate([
    (0, typeorm_1.Entity)('challenges')
], Challenge);
//# sourceMappingURL=challenge.entity.js.map