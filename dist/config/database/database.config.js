"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const sqlite_config_1 = require("./sqlite.config");
const getDatabaseConfig = (configService) => {
    return (0, sqlite_config_1.getSqliteConfig)(configService);
};
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map