import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { Challenge } from '../entities/challenge.entity';
import { Hackathon } from '../entities/hackathon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/users/entities/user.entity';
interface TeamRegistrationData {
    teamName: string;
    memberEmails: string[];
    challengeId: string;
}
export declare class TeamRegistrationService {
    private readonly teamRepository;
    private readonly challengeRepository;
    private readonly hackathonRepository;
    private readonly UserRepository;
    constructor(teamRepository: Repository<Team>, challengeRepository: Repository<Challenge>, hackathonRepository: Repository<Hackathon>, UserRepository: Repository<User>);
    registerTeamsFromSheet(hackathonId: string, registrationData: TeamRegistrationData[]): Promise<Team[]>;
    validateTeamRegistration(hackathonId: string, memberEmails: string[]): Promise<boolean>;
    getAllTeams(hackathonId: string, pagination: PaginationDto): Promise<{
        teams: Team[];
        total: number;
        page: number;
        limit: number;
    }>;
    addParticipantToTeam(hackathonId: string, teamId: string, participantId: string): Promise<void>;
    removeParticipantFromTeam(hackathonId: string, participantEmail: string): Promise<void>;
    getOneTeam(hackathonId: string, teamId: string): Promise<Team>;
}
export {};
