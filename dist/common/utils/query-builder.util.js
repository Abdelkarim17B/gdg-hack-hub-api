"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilderHelper = void 0;
class QueryBuilderHelper {
    constructor(queryBuilder) {
        this.queryBuilder = queryBuilder;
    }
    addWhereClause(field, value) {
        if (value !== undefined) {
            this.queryBuilder.andWhere(`${field} = :${field}`, { [field]: value });
        }
        return this;
    }
    addInClause(field, values) {
        if (values === null || values === void 0 ? void 0 : values.length) {
            this.queryBuilder.andWhere(`${field} IN (:...${field})`, { [field]: values });
        }
        return this;
    }
    addLikeClause(field, value) {
        if (value) {
            this.queryBuilder.andWhere(`${field} ILIKE :${field}`, { [field]: `%${value}%` });
        }
        return this;
    }
    addDateRangeClause(field, startDate, endDate) {
        if (startDate) {
            this.queryBuilder.andWhere(`${field} >= :${field}Start`, { [`${field}Start`]: startDate });
        }
        if (endDate) {
            this.queryBuilder.andWhere(`${field} <= :${field}End`, { [`${field}End`]: endDate });
        }
        return this;
    }
    addOrderClause(field, order = 'ASC', allowedFields = []) {
        if (field && allowedFields.includes(field)) {
            this.queryBuilder.orderBy(field, order);
        }
        return this;
    }
    addRelations(relations) {
        relations.forEach(relation => {
            this.queryBuilder.leftJoinAndSelect(`${this.queryBuilder.alias}.${relation}`, relation);
        });
        return this;
    }
    addPagination(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        this.queryBuilder.skip(skip).take(limit);
        return this;
    }
    getQueryBuilder() {
        return this.queryBuilder;
    }
}
exports.QueryBuilderHelper = QueryBuilderHelper;
//# sourceMappingURL=query-builder.util.js.map