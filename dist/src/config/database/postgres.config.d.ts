import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare const getPostgresConfig: (configService: ConfigService) => TypeOrmModuleOptions;
