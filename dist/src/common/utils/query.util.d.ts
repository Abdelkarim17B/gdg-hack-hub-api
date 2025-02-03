import { SelectQueryBuilder } from 'typeorm';
export declare function applySearch<T>(queryBuilder: SelectQueryBuilder<T>, search: string, fields: string[]): void;
export declare function applySorting<T>(queryBuilder: SelectQueryBuilder<T>, sortBy: string, sortOrder: 'ASC' | 'DESC', allowedFields: string[]): void;
export declare function applyPagination<T>(queryBuilder: SelectQueryBuilder<T>, page?: number, limit?: number): void;
export declare function buildWhereClause(conditions: Record<string, any>): string;
