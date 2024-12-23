import { HackathonStatus } from '../entities/hackathon.entity';
export declare class QueryHackathonDto {
    search?: string;
    status?: HackathonStatus;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
