import { Hackathon } from './hackathon.entity';
import { Challenge } from './challenge.entity';
import { Submission } from '../../submissions/entities/submission.entity';
export declare class Team {
    id: string;
    name: string;
    hackathon: Hackathon;
    hackathonId: string;
    challenge: Challenge;
    challengeId: string;
    submissions: Submission[];
    memberEmails: string[];
    createdAt: Date;
    updatedAt: Date;
}
