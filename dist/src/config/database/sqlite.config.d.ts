import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare const getSqliteConfig: (configService: ConfigService) => TypeOrmModuleOptions;
