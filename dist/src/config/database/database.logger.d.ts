import { Logger as TypeOrmLogger } from 'typeorm';
export declare class DatabaseLogger implements TypeOrmLogger {
    private readonly logger;
    logQuery(query: string, parameters?: any[]): void;
    logQueryError(error: string | Error, query: string, parameters?: any[]): void;
    logQuerySlow(time: number, query: string, parameters?: any[]): void;
    logMigration(message: string): void;
    logSchemaBuild(message: string): void;
    log(level: 'log' | 'info' | 'warn', message: any): void;
}
