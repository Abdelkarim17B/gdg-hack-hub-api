"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestUser = createTestUser;
exports.createAuthenticationToken = createAuthenticationToken;
exports.cleanupTestData = cleanupTestData;
const role_enum_1 = require("../enums/role.enum");
const bcryptjs = require("bcryptjs");
async function createTestUser(repository, role = role_enum_1.Role.USER) {
    const hashedPassword = await bcryptjs.hash('testpassword', 10);
    const user = repository.create({
        email: `test-${Date.now()}@example.com`,
        password: hashedPassword,
        name: 'Test User',
        role,
    });
    return await repository.save(user);
}
function createAuthenticationToken(user) {
    return `mock_token_${user.id}`;
}
async function cleanupTestData(repositories) {
    for (const repository of repositories) {
        await repository.clear();
    }
}
//# sourceMappingURL=test-utils.js.map