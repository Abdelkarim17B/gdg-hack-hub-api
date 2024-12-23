import { Hackathon } from './hackathon.entity';
export declare class JudgingCriteria {
    id: string;
    name: string;
    description: string;
    weight: number;
    maxScore: number;
    hackathon: Hackathon;
    hackathonId: string;
    createdAt: Date;
    updatedAt: Date;
}
