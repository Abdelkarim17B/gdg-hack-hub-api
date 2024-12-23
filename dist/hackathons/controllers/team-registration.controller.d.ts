import { TeamRegistrationService } from '../services/team-registration.service';
import { BulkTeamRegistrationDto } from '../dto/team-registration.dto';
export declare class TeamRegistrationController {
    private readonly teamRegistrationService;
    constructor(teamRegistrationService: TeamRegistrationService);
    registerTeams(hackathonId: string, bulkRegistrationDto: BulkTeamRegistrationDto): Promise<import("../entities/team.entity").Team[]>;
    validateEmails(hackathonId: string, emails: string[]): Promise<boolean>;
}
