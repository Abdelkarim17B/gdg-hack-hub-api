import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from '../config/database/database.config';
import { DatabaseService } from './database.service';
import { databaseProviders } from './database.providers';
import { entities } from '../config/database/entities.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(entities),
  ],
  providers: [...databaseProviders, DatabaseService],
  exports: [TypeOrmModule, DatabaseService],
})
export class DatabaseModule {}