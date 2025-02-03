declare class EnvironmentVariables {
    DB_TYPE: string;
    DB_DATABASE: string;
    JWT_SECRET: string;
    NODE_ENV: string;
    DB_LOGGING: boolean;
}
export declare function validateEnvConfig(config: Record<string, unknown>): EnvironmentVariables;
export {};
