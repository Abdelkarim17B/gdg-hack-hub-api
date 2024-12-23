"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiResponse = createApiResponse;
exports.createPaginatedResponse = createPaginatedResponse;
exports.createErrorResponse = createErrorResponse;
exports.createSuccessResponse = createSuccessResponse;
function createApiResponse(data, path) {
    return {
        data,
        timestamp: new Date().toISOString(),
        path,
    };
}
function createPaginatedResponse(items, total, page, limit) {
    return {
        items,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
    };
}
function createErrorResponse(message, statusCode, path) {
    return {
        statusCode,
        message,
        timestamp: new Date().toISOString(),
        path,
    };
}
function createSuccessResponse(message, path) {
    return {
        success: true,
        message,
        timestamp: new Date().toISOString(),
        path,
    };
}
//# sourceMappingURL=response.util.js.map