"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = seedAdmin;
const user_entity_ts_1 = require("../../users/entities/user.entity.ts");
const bcrypt = require("bcrypt");
async function seedAdmin(dataSource) {
    const userRepository = dataSource.getRepository(user_entity_ts_1.User);
    const existingAdmin = await userRepository.findOne({
        where: { email: 'admin@admin.com' }
    });
    if (!existingAdmin) {
        const admin = new user_entity_ts_1.User();
        admin.email = 'admin@admin.com';
        admin.password = await bcrypt.hash('admin123', 10);
        admin.role = 'admin';
        await userRepository.save(admin);
        console.log('Admin user seeded successfully');
    }
}
//# sourceMappingURL=adminSeeder.js.map