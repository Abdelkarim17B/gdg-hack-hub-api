"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
const bcryptjs = require("bcryptjs");
const SALT_ROUNDS = 10;
async function hashPassword(password) {
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    return bcryptjs.hash(password, salt);
}
async function comparePasswords(plainText, hashedPassword) {
    return bcryptjs.compare(plainText, hashedPassword);
}
//# sourceMappingURL=crypto.util.js.map