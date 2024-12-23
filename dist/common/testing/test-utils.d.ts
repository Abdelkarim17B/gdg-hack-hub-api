import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../enums/role.enum';
export declare function createTestUser(repository: Repository<User>, role?: Role): Promise<User>;
export declare function createAuthenticationToken(user: User): string;
export declare function cleanupTestData(repositories: Repository<any>[]): Promise<void>;
