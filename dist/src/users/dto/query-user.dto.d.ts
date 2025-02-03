import { Role } from '../../common/enums/role.enum';
export declare class QueryUserDto {
    search?: string;
    role?: Role;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
