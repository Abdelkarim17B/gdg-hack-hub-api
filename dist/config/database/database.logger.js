"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseLogger = void 0;
const common_1 = require("@nestjs/common");
class DatabaseLogger {
    constructor() {
        this.logger = new common_1.Logger('Database');
    }
    logQuery(query, parameters) {
        this.logger.debug(`Query: ${query} -- Parameters: ${JSON.stringify(parameters)}`);
    }
    logQueryError(error, query, parameters) {
        this.logger.error(`Query Error: ${query} -- Parameters: ${JSON.stringify(parameters)} -- Error: ${error}`);
    }
    logQuerySlow(time, query, parameters) {
        this.logger.warn(`Slow Query (${time}ms): ${query} -- Parameters: ${JSON.stringify(parameters)}`);
    }
    logMigration(message) {
        this.logger.log(`Migration: ${message}`);
    }
    logSchemaBuild(message) {
        this.logger.log(`Schema Build: ${message}`);
    }
    log(level, message) {
        switch (level) {
            case 'log':
                this.logger.log(message);
                break;
            case 'info':
                this.logger.debug(message);
                break;
            case 'warn':
                this.logger.warn(message);
                break;
        }
    }
}
exports.DatabaseLogger = DatabaseLogger;
//# sourceMappingURL=database.logger.js.map