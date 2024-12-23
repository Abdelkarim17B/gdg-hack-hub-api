import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../enums/role.enum';
import * as bcryptjs from 'bcryptjs';

export async function createTestUser(
  repository: Repository<User>,
  role: Role = Role.USER,
): Promise<User> {
  const hashedPassword = await bcryptjs.hash('testpassword', 10);
  const user = repository.create({
    email: `test-${Date.now()}@example.com`,
    password: hashedPassword,
    name: 'Test User',
    role,
  });
  return await repository.save(user);
}

export function createAuthenticationToken(user: User): string {
  return `mock_token_${user.id}`;
}

export async function cleanupTestData(repositories: Repository<any>[]): Promise<void> {
  for (const repository of repositories) {
    await repository.clear();
  }
}