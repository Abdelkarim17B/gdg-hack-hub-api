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
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const hackathon_entity_1 = require("../hackathons/entities/hackathon.entity");
const submission_entity_1 = require("../submissions/entities/submission.entity");
const evaluation_entity_1 = require("../evaluations/entities/evaluation.entity");
const database_util_1 = require("../common/utils/database.util");
const role_enum_1 = require("../common/enums/role.enum");
const crypto_util_1 = require("../common/utils/crypto.util");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(userRepository, hackathonRepository, submissionRepository, evaluationRepository) {
        this.userRepository = userRepository;
        this.hackathonRepository = hackathonRepository;
        this.submissionRepository = submissionRepository;
        this.evaluationRepository = evaluationRepository;
        this.logger = new common_1.Logger(DatabaseService_1.name);
    }
    async onModuleInit() {
        try {
            this.logger.log('Initializing database...');
            await this.initialize();
            await this.createAdminUser();
            this.logger.log('Database initialization completed successfully');
        }
        catch (error) {
            this.logger.error('Failed to initialize database', error.stack);
            throw error;
        }
    }
    async initialize() {
        const repositories = [
            this.userRepository,
            this.hackathonRepository,
            this.submissionRepository,
            this.evaluationRepository,
        ];
        await (0, database_util_1.initializeDatabase)(repositories);
    }
    async createAdminUser() {
        const adminEmail = 'admin@test.com';
        const existingAdmin = await this.userRepository.findOne({
            where: { email: adminEmail }
        });
        if (!existingAdmin) {
            const hashedPassword = await (0, crypto_util_1.hashPassword)('Admin123!');
            const admin = this.userRepository.create({
                email: adminEmail,
                password: hashedPassword,
                name: 'System Administrator',
                role: role_enum_1.Role.ADMIN
            });
            await this.userRepository.save(admin);
            this.logger.log('Admin user created successfully');
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(hackathon_entity_1.Hackathon)),
    __param(2, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __param(3, (0, typeorm_1.InjectRepository)(evaluation_entity_1.Evaluation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DatabaseService);
//# sourceMappingURL=database.service.js.map