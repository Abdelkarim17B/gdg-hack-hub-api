import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class RateLimitMiddleware implements NestMiddleware {
    private requests;
    private readonly config;
    use(req: Request, res: Response, next: NextFunction): void;
}
