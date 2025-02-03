import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { getSqliteConfig } from './sqlite.config';
import { getPostgresConfig } from './postgres.config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const dbType = configService.get('DB_TYPE', 'postgres');
  
  switch (dbType) {
    case 'sqlite':
      return getSqliteConfig(configService);
    case 'postgres':
      return getPostgresConfig(configService);
    default:
      throw new Error(`Unsupported database type: ${dbType}`);
  }
};