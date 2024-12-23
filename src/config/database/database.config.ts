import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { getSqliteConfig } from './sqlite.config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return getSqliteConfig(configService);
};