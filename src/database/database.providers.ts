import { Provider } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getPostgresConfig } from '../config/database/postgres.config';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const config = getPostgresConfig(configService) as DataSourceOptions;
      const dataSource = new DataSource(config);
      return dataSource.initialize();
    },
  },
];