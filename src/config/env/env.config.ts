import { plainToClass, Transform } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, validateSync, IsOptional, IsEnum, IsPort } from 'class-validator';

export enum DatabaseType {
  SQLITE = 'sqlite',
  POSTGRES = 'postgres'
}

export class EnvironmentVariables {
  @IsString()
  NODE_ENV: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  PORT: number;

  // Database Type
  @IsEnum(DatabaseType)
  @IsOptional()
  @Transform(({ value }) => value || DatabaseType.POSTGRES)
  DB_TYPE: DatabaseType;

  // Common Database Config
  @IsString()
  DB_DATABASE: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  DB_LOGGING: boolean;

  // PostgreSQL Specific Config
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || 'localhost')
  DB_HOST: string;

  @IsPort()
  @IsOptional()
  @Transform(({ value }) => value || '5432')
  DB_PORT: string;

  @IsString()
  @IsOptional()
  DB_USERNAME: string;

  @IsString()
  @IsOptional()
  DB_PASSWORD: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  DB_SSL: boolean;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value ? parseInt(value, 10) : 100)
  DB_MAX_CONNECTIONS: number;

  // JWT Config
  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value ? parseInt(value, 10) : 3600)
  JWT_EXPIRATION: number;
}

export function validateEnvConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, {
    ...config,
    PORT: process.env.PORT || 3000,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || 3600,
    DB_TYPE: process.env.DB_TYPE || DatabaseType.POSTGRES,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_MAX_CONNECTIONS: process.env.DB_MAX_CONNECTIONS || 100,
    DB_SSL: process.env.DB_SSL || false,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}