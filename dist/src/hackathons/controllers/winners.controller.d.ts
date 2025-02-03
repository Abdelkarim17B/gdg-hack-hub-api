import { WinnerDeterminationService } from '../services/winner-determination.service';
export declare class WinnersController {
    private readonly winnerService;
    constructor(winnerService: WinnerDeterminationService);
    getWinners(hackathonId: string): Promise<import("../services/winner-determination.service").TeamScore[]>;
    getWinnersByChallenge(hackathonId: string): Promise<Record<string, import("../services/winner-determination.service").TeamScore[]>>;
}
