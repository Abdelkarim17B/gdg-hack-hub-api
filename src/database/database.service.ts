import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Hackathon } from '../hackathons/entities/hackathon.entity';
import { Submission } from '../submissions/entities/submission.entity';
import { Evaluation } from '../evaluations/entities/evaluation.entity';
import { initializeDatabase } from '../common/utils/database.util';
import { Role } from '../common/enums/role.enum';
import { hashPassword } from '../common/utils/crypto.util';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Hackathon)
    private readonly hackathonRepository: Repository<Hackathon>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}

  async onModuleInit() {
    try {
      this.logger.log('Initializing database...');
      await this.initialize();
      await this.createAdminUser();
      this.logger.log('Database initialization completed successfully');
    } catch (error) {
      this.logger.error('Failed to initialize database', error.stack);
      throw error;
    }
  }

  private async initialize() {
    const repositories = [
      this.userRepository,
      this.hackathonRepository,
      this.submissionRepository,
      this.evaluationRepository,
    ];

    await initializeDatabase(repositories);
  }

  private async createAdminUser() {
    const adminEmail = 'admin@test.com';
    const existingAdmin = await this.userRepository.findOne({
      where: { email: adminEmail }
    });

    if (!existingAdmin) {
      const hashedPassword = await hashPassword('Admin123!');
      const admin = this.userRepository.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'System Administrator',
        role: Role.ADMIN
      });

      await this.userRepository.save(admin);
      this.logger.log('Admin user created successfully');
    }
  }
}