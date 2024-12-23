"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
async function paginate(queryBuilder, paginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);
    const [items, total] = await queryBuilder.getManyAndCount();
    return {
        items,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
    };
}
//# sourceMappingURL=pagination.util.js.map