import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ChallengeService } from '../services/challenge.service';
import { CreateChallengeDto, UpdateChallengeDto } from '../dto/challenge.dto';
export declare class ChallengeController {
    private readonly challengeService;
    constructor(challengeService: ChallengeService);
    createChallenge(hackathonId: string, createChallengeDto: CreateChallengeDto): Promise<import("../entities/challenge.entity").Challenge>;
    getAllChallenges(hackathonId: string, pagination: PaginationDto): Promise<{
        challenges: import("../entities/challenge.entity").Challenge[];
        total: number;
        page: number;
        limit: number;
    }>;
    getChallenge(hackathonId: string, challengeId: string): Promise<import("../entities/challenge.entity").Challenge>;
    updateChallenge(id: string, updateChallengeDto: UpdateChallengeDto): Promise<import("../entities/challenge.entity").Challenge>;
    deleteChallenge(challengeId: string): Promise<import("../entities/challenge.entity").Challenge>;
}
