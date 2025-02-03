"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxFileSize = exports.allowedImageExtensions = void 0;
exports.validateFileExtension = validateFileExtension;
exports.validateFileSize = validateFileSize;
exports.generateUniqueFilename = generateUniqueFilename;
exports.getFileType = getFileType;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
exports.allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
exports.maxFileSize = 5 * 1024 * 1024;
function validateFileExtension(filename, allowedExtensions) {
    const ext = (0, path_1.extname)(filename).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
        throw new common_1.BadRequestException(`Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`);
    }
}
function validateFileSize(size, maxSize) {
    if (size > maxSize) {
        throw new common_1.BadRequestException(`File size exceeds the limit. Maximum allowed size: ${maxSize / 1024 / 1024}MB`);
    }
}
function generateUniqueFilename(originalname) {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = (0, path_1.extname)(originalname);
    return `${timestamp}-${randomString}${ext}`;
}
function getFileType(filename) {
    const ext = (0, path_1.extname)(filename).toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const documentExtensions = ['.pdf', '.doc', '.docx'];
    if (imageExtensions.includes(ext))
        return 'image';
    if (documentExtensions.includes(ext))
        return 'document';
    return 'other';
}
//# sourceMappingURL=file.util.js.map