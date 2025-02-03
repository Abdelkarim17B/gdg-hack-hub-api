export declare class TeamRegistrationDto {
    teamName: string;
    memberEmails: string[];
    challengeId: string;
}
export declare class BulkTeamRegistrationDto {
    teams: TeamRegistrationDto[];
}
export declare class BodySchemaDto {
    emails: string[];
}
export declare class AddParticipantToTeamDto {
    teamId: string;
    participantId: string;
}
export declare class removeParticipantFromTeamDto {
    participantEmail: string;
}
