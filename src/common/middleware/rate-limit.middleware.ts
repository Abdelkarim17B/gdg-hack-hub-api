import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests: Map<string, number[]> = new Map();
  private readonly config: RateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  };

  use(req: Request, res: Response, next: NextFunction): void {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Get existing requests for this IP
    let requests = this.requests.get(ip) || [];
    
    // Filter out requests outside the current window
    requests = requests.filter(timestamp => timestamp > windowStart);
    
    // Add current request
    requests.push(now);
    
    // Update requests for this IP
    this.requests.set(ip, requests);

    if (requests.length > this.config.max) {
      throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
    }

    next();
  }
}