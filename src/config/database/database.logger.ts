import { Logger as TypeOrmLogger } from 'typeorm';
import { Logger } from '@nestjs/common';

export class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new Logger('Database');

  logQuery(query: string, parameters?: any[]) {
    this.logger.debug(`Query: ${query} -- Parameters: ${JSON.stringify(parameters)}`);
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    this.logger.error(`Query Error: ${query} -- Parameters: ${JSON.stringify(parameters)} -- Error: ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn(`Slow Query (${time}ms): ${query} -- Parameters: ${JSON.stringify(parameters)}`);
  }

  logMigration(message: string) {
    this.logger.log(`Migration: ${message}`);
  }

  logSchemaBuild(message: string) {
    this.logger.log(`Schema Build: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
        this.logger.log(message);
        break;
      case 'info':
        this.logger.debug(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }
}