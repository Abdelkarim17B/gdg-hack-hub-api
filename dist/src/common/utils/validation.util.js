"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUUID = validateUUID;
exports.validateDateRange = validateDateRange;
exports.validateScoreRange = validateScoreRange;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validateRequired = validateRequired;
exports.validateLength = validateLength;
exports.validateNumericRange = validateNumericRange;
exports.validateArrayLength = validateArrayLength;
const common_1 = require("@nestjs/common");
function validateUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        throw new common_1.BadRequestException('Invalid UUID format');
    }
}
function validateDateRange(startDate, endDate) {
    if (startDate >= endDate) {
        throw new common_1.BadRequestException('Start date must be before end date');
    }
}
function validateScoreRange(score, min = 0, max = 100) {
    if (score < min || score > max) {
        throw new common_1.BadRequestException(`Score must be between ${min} and ${max}`);
    }
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePassword(password) {
    if (password.length < 8) {
        throw new common_1.BadRequestException('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        throw new common_1.BadRequestException('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        throw new common_1.BadRequestException('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        throw new common_1.BadRequestException('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new common_1.BadRequestException('Password must contain at least one special character');
    }
}
function validateRequired(value, fieldName) {
    if (value === undefined || value === null || value === '') {
        throw new common_1.BadRequestException(`${fieldName} is required`);
    }
}
function validateLength(value, fieldName, min, max) {
    if (value.length < min || value.length > max) {
        throw new common_1.BadRequestException(`${fieldName} must be between ${min} and ${max} characters`);
    }
}
function validateNumericRange(value, fieldName, min, max) {
    if (value < min || value > max) {
        throw new common_1.BadRequestException(`${fieldName} must be between ${min} and ${max}`);
    }
}
function validateArrayLength(array, fieldName, min, max) {
    if (array.length < min || array.length > max) {
        throw new common_1.BadRequestException(`${fieldName} must have between ${min} and ${max} items`);
    }
}
//# sourceMappingURL=validation.util.js.map