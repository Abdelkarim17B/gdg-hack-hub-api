export declare class TeamRegistrationDto {
    teamName: string;
    memberEmails: string[];
    challengeId: string;
}
export declare class BulkTeamRegistrationDto {
    teams: TeamRegistrationDto[];
}
