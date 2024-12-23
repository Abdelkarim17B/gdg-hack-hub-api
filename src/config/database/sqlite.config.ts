import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { entities } from './entities.config';

export const getSqliteConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: join(process.cwd(), configService.get('DB_DATABASE', 'hackathon_platform.db')),
  entities,
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('DB_LOGGING', 'false') === 'true',
  autoLoadEntities: false,
  extra: {
    fileMustExist: false,
    extra: {
      timeout: 5000,
    },    
    journal_mode: 'WAL',
    synchronous: 'NORMAL'
  }
});