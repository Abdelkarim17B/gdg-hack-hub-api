"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDatabaseModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
exports.TestDatabaseModule = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [config_1.ConfigModule],
    useFactory: (configService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_NAME', 'hackathon_platform_test'),
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: true,
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=database.mock.js.map