import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { entities } from './entities.config';
import { DatabaseLogger } from './database.logger';
import { SnakeNamingStrategy } from './snake-naming.strategy';

export const getPostgresConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'your_username'),
  password: configService.get('DB_PASSWORD', ''),
  database: configService.get('DB_DATABASE', 'hackathon_platform'),
  entities,
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('DB_LOGGING', 'false') === 'true',
  logger: new DatabaseLogger(),
  namingStrategy: new SnakeNamingStrategy(),
  autoLoadEntities: false,
  ssl: configService.get('DB_SSL', 'false') === 'true' ? {
    rejectUnauthorized: false,
  } : false,
  extra: {
    max: configService.get('DB_MAX_CONNECTIONS', 100),
    connectionTimeoutMillis: 5000,
  }
});