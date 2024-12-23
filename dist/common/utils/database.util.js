"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
exports.paginate = paginate;
exports.findOneOrFail = findOneOrFail;
exports.buildWhereClause = buildWhereClause;
exports.buildOrderClause = buildOrderClause;
exports.applySearchFilter = applySearchFilter;
exports.applyDateFilter = applyDateFilter;
const common_1 = require("@nestjs/common");
async function initializeDatabase(repositories) {
    if (!repositories.length) {
        throw new Error('No repositories provided for initialization');
    }
    const queryRunner = repositories[0].manager.connection.createQueryRunner();
    try {
        await queryRunner.connect();
        await queryRunner.query('PRAGMA journal_mode = WAL');
        await queryRunner.query('PRAGMA busy_timeout = 20000');
        await queryRunner.query('PRAGMA synchronous = NORMAL');
        await queryRunner.query('PRAGMA foreign_keys = ON');
        await queryRunner.startTransaction();
        try {
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    }
    catch (error) {
        throw new Error(`Failed to initialize database: ${error.message}`);
    }
    finally {
        await queryRunner.release();
    }
}
async function paginate(queryBuilder, { page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;
    const [items, total] = await queryBuilder
        .skip(skip)
        .take(limit)
        .getManyAndCount();
    return {
        items,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
    };
}
async function findOneOrFail(repository, id, relations = []) {
    const entity = await repository.findOne({
        where: { id },
        relations,
    });
    if (!entity) {
        throw new common_1.BadRequestException(`Entity with ID ${id} not found`);
    }
    return entity;
}
function buildWhereClause(conditions) {
    return Object.entries(conditions)
        .filter(([_, value]) => value !== undefined)
        .map(([key]) => `${key} = :${key}`)
        .join(' AND ');
}
function buildOrderClause(sortBy, sortOrder = 'ASC', allowedFields = []) {
    if (!sortBy || !allowedFields.includes(sortBy)) {
        return undefined;
    }
    return `${sortBy} ${sortOrder}`;
}
function applySearchFilter(queryBuilder, searchTerm, searchFields) {
    if (!searchTerm || !searchFields.length)
        return;
    const conditions = searchFields.map(field => `${field} LIKE :searchTerm`);
    queryBuilder.andWhere(`(${conditions.join(' OR ')})`, {
        searchTerm: `%${searchTerm}%`,
    });
}
function applyDateFilter(queryBuilder, dateField, startDate, endDate) {
    if (startDate) {
        queryBuilder.andWhere(`${dateField} >= :startDate`, { startDate });
    }
    if (endDate) {
        queryBuilder.andWhere(`${dateField} <= :endDate`, { endDate });
    }
}
//# sourceMappingURL=database.util.js.map