import { Hackathon } from './hackathon.entity';
import { Team } from './team.entity';
export declare class Challenge {
    id: string;
    name: string;
    description: string;
    criteria: string;
    hackathon: Hackathon;
    teams: Team[];
    createdAt: Date;
    updatedAt: Date;
}
