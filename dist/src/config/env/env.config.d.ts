export declare enum DatabaseType {
    SQLITE = "sqlite",
    POSTGRES = "postgres"
}
export declare class EnvironmentVariables {
    NODE_ENV: string;
    PORT: number;
    DB_TYPE: DatabaseType;
    DB_DATABASE: string;
    DB_LOGGING: boolean;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_SSL: boolean;
    DB_MAX_CONNECTIONS: number;
    JWT_SECRET: string;
    JWT_EXPIRATION: number;
}
export declare function validateEnvConfig(config: Record<string, unknown>): EnvironmentVariables;
