"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const path_1 = require("path");
const getDatabaseConfig = (configService) => ({
    type: 'sqlite',
    database: (0, path_1.join)(process.cwd(), configService.get('DB_DATABASE', 'hackathon_platform.db')),
    entities: [(0, path_1.join)(__dirname, '..', '**', '*.entity{.ts,.js}')],
    synchronize: configService.get('NODE_ENV') !== 'production',
    logging: configService.get('DB_LOGGING', 'false') === 'true',
    autoLoadEntities: true
});
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map