import { TeamRegistrationService } from '../services/team-registration.service';
import { BulkTeamRegistrationDto } from '../dto/team-registration.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare class TeamRegistrationController {
    private readonly teamRegistrationService;
    constructor(teamRegistrationService: TeamRegistrationService);
    registerTeams(hackathonId: string, bulkRegistrationDto: BulkTeamRegistrationDto): Promise<import("../entities/team.entity").Team[]>;
    validateEmails(hackathonId: string, emails: string[]): Promise<boolean>;
    getAllTeams(hackathonId: string, pagination: PaginationDto): Promise<{
        teams: import("../entities/team.entity").Team[];
        total: number;
        page: number;
        limit: number;
    }>;
    getOneTeam(hackathonId: string, id: string): Promise<import("../entities/team.entity").Team>;
    addParticipantToTeam(hackathonId: string, teamId: string, participantId: string): Promise<void>;
    removeParticipantFromTeam(hackathonId: string, participantEmail: string): Promise<void>;
}
