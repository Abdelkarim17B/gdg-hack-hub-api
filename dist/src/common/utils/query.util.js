"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySearch = applySearch;
exports.applySorting = applySorting;
exports.applyPagination = applyPagination;
exports.buildWhereClause = buildWhereClause;
function applySearch(queryBuilder, search, fields) {
    if (!search || !fields.length)
        return;
    const conditions = fields.map(field => `${field} ILIKE :search`);
    queryBuilder.andWhere(`(${conditions.join(' OR ')})`, {
        search: `%${search}%`,
    });
}
function applySorting(queryBuilder, sortBy, sortOrder = 'ASC', allowedFields) {
    if (!sortBy || !allowedFields.includes(sortBy))
        return;
    queryBuilder.orderBy(sortBy, sortOrder);
}
function applyPagination(queryBuilder, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);
}
function buildWhereClause(conditions) {
    return Object.entries(conditions)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key} = :${key}`)
        .join(' AND ');
}
//# sourceMappingURL=query.util.js.map