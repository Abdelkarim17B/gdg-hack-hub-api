import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { Challenge } from '../entities/challenge.entity';
import { Hackathon } from '../entities/hackathon.entity';
interface TeamRegistrationData {
    teamName: string;
    memberEmails: string[];
    challengeId: string;
}
export declare class TeamRegistrationService {
    private readonly teamRepository;
    private readonly challengeRepository;
    private readonly hackathonRepository;
    constructor(teamRepository: Repository<Team>, challengeRepository: Repository<Challenge>, hackathonRepository: Repository<Hackathon>);
    registerTeamsFromSheet(hackathonId: string, registrationData: TeamRegistrationData[]): Promise<Team[]>;
    validateTeamRegistration(hackathonId: string, memberEmails: string[]): Promise<boolean>;
}
export {};
