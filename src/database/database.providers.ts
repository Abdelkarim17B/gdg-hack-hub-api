import { Provider } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getSqliteConfig } from '../config/database/sqlite.config';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const config = getSqliteConfig(configService) as DataSourceOptions;
      const dataSource = new DataSource(config);
      return dataSource.initialize();
    },
  },
];