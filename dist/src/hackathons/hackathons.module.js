"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackathonsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hackathons_service_1 = require("./hackathons.service");
const hackathons_controller_1 = require("./hackathons.controller");
const team_registration_controller_1 = require("./controllers/team-registration.controller");
const winners_controller_1 = require("./controllers/winners.controller");
const services_1 = require("./services");
const hackathon_entity_1 = require("./entities/hackathon.entity");
const challenge_entity_1 = require("./entities/challenge.entity");
const team_entity_1 = require("./entities/team.entity");
const judge_assignment_entity_1 = require("./entities/judge-assignment.entity");
const judging_criteria_entity_1 = require("./entities/judging-criteria.entity");
const submission_entity_1 = require("../submissions/entities/submission.entity");
const evaluation_entity_1 = require("../evaluations/entities/evaluation.entity");
const challenge_controller_1 = require("./controllers/challenge.controller");
const judgingCriteria_controller_1 = require("./controllers/judgingCriteria.controller");
let HackathonsModule = class HackathonsModule {
};
exports.HackathonsModule = HackathonsModule;
exports.HackathonsModule = HackathonsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                hackathon_entity_1.Hackathon,
                challenge_entity_1.Challenge,
                team_entity_1.Team,
                judge_assignment_entity_1.JudgeAssignment,
                judging_criteria_entity_1.JudgingCriteria,
                submission_entity_1.Submission,
                evaluation_entity_1.Evaluation
            ]),
        ],
        controllers: [
            hackathons_controller_1.HackathonsController,
            team_registration_controller_1.TeamRegistrationController,
            winners_controller_1.WinnersController,
            challenge_controller_1.ChallengeController,
            judgingCriteria_controller_1.JudgingCriteriaController
        ],
        providers: [
            hackathons_service_1.HackathonsService,
            services_1.TeamRegistrationService,
            services_1.WinnerDeterminationService,
            services_1.ChallengeService,
            services_1.JudgingCriteriaService
        ],
        exports: [
            hackathons_service_1.HackathonsService,
            services_1.TeamRegistrationService,
            services_1.WinnerDeterminationService,
            services_1.ChallengeService,
            services_1.JudgingCriteriaService
        ],
    })
], HackathonsModule);
//# sourceMappingURL=hackathons.module.js.map