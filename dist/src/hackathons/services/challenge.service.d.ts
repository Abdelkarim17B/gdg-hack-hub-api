import { CreateChallengeDto, UpdateChallengeDto } from './../dto/challenge.dto';
import { Challenge } from './../entities/challenge.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { Hackathon } from '../entities/hackathon.entity';
export declare class ChallengeService {
    private ChallengeRepository;
    private HackathonRepository;
    constructor(ChallengeRepository: Repository<Challenge>, HackathonRepository: Repository<Hackathon>);
    create(CreateChallengeDto: CreateChallengeDto, hackathonId: string): Promise<Challenge>;
    findAll(hackathonId: string, pagination: PaginationDto): Promise<{
        challenges: Challenge[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(challengeId: string): Promise<Challenge>;
    update(updateChallengeDto: UpdateChallengeDto, id: string): Promise<Challenge>;
    delete(challengeId: string): Promise<Challenge>;
}
