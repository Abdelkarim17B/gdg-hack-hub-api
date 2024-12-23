"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const hackathon_entity_1 = require("../../hackathons/entities/hackathon.entity");
const challenge_entity_1 = require("../../hackathons/entities/challenge.entity");
const team_entity_1 = require("../../hackathons/entities/team.entity");
const judge_assignment_entity_1 = require("../../hackathons/entities/judge-assignment.entity");
const judging_criteria_entity_1 = require("../../hackathons/entities/judging-criteria.entity");
const submission_entity_1 = require("../../submissions/entities/submission.entity");
const evaluation_entity_1 = require("../../evaluations/entities/evaluation.entity");
exports.entities = [
    user_entity_1.User,
    hackathon_entity_1.Hackathon,
    challenge_entity_1.Challenge,
    team_entity_1.Team,
    judge_assignment_entity_1.JudgeAssignment,
    judging_criteria_entity_1.JudgingCriteria,
    submission_entity_1.Submission,
    evaluation_entity_1.Evaluation
];
//# sourceMappingURL=entities.config.js.map