"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const snake_naming_strategy_1 = require("./src/config/database/snake-naming.strategy");
const entities_config_1 = require("./src/config/database/entities.config");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: parseInt(configService.get('DB_PORT', '5432'), 10),
    username: configService.get('DB_USERNAME', 'your_username'),
    password: configService.get('DB_PASSWORD', ''),
    database: configService.get('DB_DATABASE', 'hackathon_platform'),
    entities: entities_config_1.entities,
    migrations: ['src/migrations/*.ts'],
    namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
});
//# sourceMappingURL=typeorm.config.js.map