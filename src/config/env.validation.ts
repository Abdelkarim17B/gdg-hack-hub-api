import { plainToClass } from 'class-transformer';
import { IsString, IsBoolean, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DB_TYPE: string;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  NODE_ENV: string;

  @IsBoolean()
  DB_LOGGING: boolean;
}

export function validateEnvConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, {
    ...config,
    DB_LOGGING: config.DB_LOGGING === 'true',
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}