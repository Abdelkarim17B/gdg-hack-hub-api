export declare class EnvironmentVariables {
    NODE_ENV: string;
    PORT: number;
    DB_DATABASE: string;
    DB_LOGGING: boolean;
    JWT_SECRET: string;
    JWT_EXPIRATION: number;
}
export declare function validateEnvConfig(config: Record<string, unknown>): EnvironmentVariables;
