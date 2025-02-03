"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const sqlite_config_1 = require("./sqlite.config");
const postgres_config_1 = require("./postgres.config");
const getDatabaseConfig = (configService) => {
    const dbType = configService.get('DB_TYPE', 'postgres');
    switch (dbType) {
        case 'sqlite':
            return (0, sqlite_config_1.getSqliteConfig)(configService);
        case 'postgres':
            return (0, postgres_config_1.getPostgresConfig)(configService);
        default:
            throw new Error(`Unsupported database type: ${dbType}`);
    }
};
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map