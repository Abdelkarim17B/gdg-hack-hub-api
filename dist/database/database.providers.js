"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const sqlite_config_1 = require("../config/database/sqlite.config");
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            const config = (0, sqlite_config_1.getSqliteConfig)(configService);
            const dataSource = new typeorm_1.DataSource(config);
            return dataSource.initialize();
        },
    },
];
//# sourceMappingURL=database.providers.js.map