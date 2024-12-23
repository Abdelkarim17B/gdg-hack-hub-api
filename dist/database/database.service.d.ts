import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Hackathon } from '../hackathons/entities/hackathon.entity';
import { Submission } from '../submissions/entities/submission.entity';
import { Evaluation } from '../evaluations/entities/evaluation.entity';
export declare class DatabaseService implements OnModuleInit {
    private readonly userRepository;
    private readonly hackathonRepository;
    private readonly submissionRepository;
    private readonly evaluationRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, hackathonRepository: Repository<Hackathon>, submissionRepository: Repository<Submission>, evaluationRepository: Repository<Evaluation>);
    onModuleInit(): Promise<void>;
    private initialize;
    private createAdminUser;
}
