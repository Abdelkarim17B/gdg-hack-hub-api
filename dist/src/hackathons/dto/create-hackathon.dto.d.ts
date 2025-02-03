import { HackathonStatus } from '../entities/hackathon.entity';
export declare class CreateHackathonDto {
    title: string;
    description: string;
    location?: string | null;
    theme?: string;
    startDate: Date;
    endDate: Date;
    registrationDeadline: Date;
    maxParticipants: number;
    maxTeamSize: number;
    minTeamSize: number;
    status: HackathonStatus;
    rules: string;
    prizes: string;
}
