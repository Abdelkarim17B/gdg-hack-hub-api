import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: join(process.cwd(), configService.get('DB_DATABASE', 'hackathon_platform.db')),
  entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('DB_LOGGING', 'false') === 'true',
  autoLoadEntities: true
});