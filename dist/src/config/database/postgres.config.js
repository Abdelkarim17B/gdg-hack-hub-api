"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostgresConfig = void 0;
const entities_config_1 = require("./entities.config");
const database_logger_1 = require("./database.logger");
const snake_naming_strategy_1 = require("./snake-naming.strategy");
const getPostgresConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get('DB_PORT', 5432),
    username: configService.get('DB_USERNAME', 'your_username'),
    password: configService.get('DB_PASSWORD', ''),
    database: configService.get('DB_DATABASE', 'hackathon_platform'),
    entities: entities_config_1.entities,
    synchronize: configService.get('NODE_ENV') !== 'production',
    logging: configService.get('DB_LOGGING', 'false') === 'true',
    logger: new database_logger_1.DatabaseLogger(),
    namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
    autoLoadEntities: false,
    ssl: configService.get('DB_SSL', 'false') === 'true' ? {
        rejectUnauthorized: false,
    } : false,
    extra: {
        max: configService.get('DB_MAX_CONNECTIONS', 100),
        connectionTimeoutMillis: 5000,
    }
});
exports.getPostgresConfig = getPostgresConfig;
//# sourceMappingURL=postgres.config.js.map