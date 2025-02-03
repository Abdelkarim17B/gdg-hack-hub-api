"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSqliteConfig = void 0;
const path_1 = require("path");
const entities_config_1 = require("./entities.config");
const getSqliteConfig = (configService) => ({
    type: 'sqlite',
    database: (0, path_1.join)(process.cwd(), configService.get('DB_DATABASE', 'hackathon_platform.db')),
    entities: entities_config_1.entities,
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
exports.getSqliteConfig = getSqliteConfig;
//# sourceMappingURL=sqlite.config.js.map