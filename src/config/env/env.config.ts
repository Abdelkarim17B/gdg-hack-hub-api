import { plainToClass, Transform } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, validateSync, IsOptional } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  NODE_ENV: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  PORT: number;

  @IsString()
  DB_DATABASE: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  DB_LOGGING: boolean;

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
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}