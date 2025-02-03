// typeorm.config.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from './src/config/database/snake-naming.strategy';
import { entities } from './src/config/database/entities.config';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: parseInt(configService.get('DB_PORT', '5432'), 10),
  username: configService.get('DB_USERNAME', 'password'),
  password: configService.get('DB_PASSWORD', ''),
  database: configService.get('DB_DATABASE', 'hackathon_platform'),
  entities,
  migrations: ['src/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});
