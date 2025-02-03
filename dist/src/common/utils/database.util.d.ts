import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}
export declare function initializeDatabase(repositories: Repository<any>[]): Promise<void>;
export declare function paginate<T>(queryBuilder: SelectQueryBuilder<T>, { page, limit }: PaginationDto): Promise<PaginatedResult<T>>;
export declare function findOneOrFail<T>(repository: Repository<T>, id: string, relations?: string[]): Promise<T>;
export declare function buildWhereClause(conditions: Record<string, any>): string;
export declare function buildOrderClause(sortBy?: string, sortOrder?: 'ASC' | 'DESC', allowedFields?: string[]): string | undefined;
export declare function applySearchFilter<T>(queryBuilder: SelectQueryBuilder<T>, searchTerm: string, searchFields: string[]): void;
export declare function applyDateFilter<T>(queryBuilder: SelectQueryBuilder<T>, dateField: string, startDate?: Date, endDate?: Date): void;
