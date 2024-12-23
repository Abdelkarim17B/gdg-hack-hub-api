import { HackathonStatus } from '../entities/hackathon.entity';
export declare class CreateHackathonDto {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    registrationDeadline: Date;
    maxParticipants: number;
    status: HackathonStatus;
    rules: string;
    prizes: string;
}
