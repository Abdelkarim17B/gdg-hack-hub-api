"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
exports.handleDatabaseError = handleDatabaseError;
exports.throwIfNotFound = throwIfNotFound;
exports.throwIfUnauthorized = throwIfUnauthorized;
exports.throwIfForbidden = throwIfForbidden;
const common_1 = require("@nestjs/common");
class ApiError extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.ApiError = ApiError;
function handleDatabaseError(error) {
    if (error.code === '23505') {
        throw new ApiError('Resource already exists', common_1.HttpStatus.CONFLICT);
    }
    if (error.code === '23503') {
        throw new ApiError('Referenced resource not found', common_1.HttpStatus.BAD_REQUEST);
    }
    throw new ApiError('Database error occurred', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
}
function throwIfNotFound(resource, message) {
    if (!resource) {
        throw new ApiError(message, common_1.HttpStatus.NOT_FOUND);
    }
}
function throwIfUnauthorized(condition, message) {
    if (condition) {
        throw new ApiError(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
function throwIfForbidden(condition, message) {
    if (condition) {
        throw new ApiError(message, common_1.HttpStatus.FORBIDDEN);
    }
}
//# sourceMappingURL=error.util.js.map