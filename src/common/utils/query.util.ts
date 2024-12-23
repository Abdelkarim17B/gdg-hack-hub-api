import { SelectQueryBuilder } from 'typeorm';

export function applySearch<T>(
  queryBuilder: SelectQueryBuilder<T>,
  search: string,
  fields: string[],
): void {
  if (!search || !fields.length) return;

  const conditions = fields.map(field => `${field} ILIKE :search`);
  queryBuilder.andWhere(`(${conditions.join(' OR ')})`, {
    search: `%${search}%`,
  });
}

export function applySorting<T>(
  queryBuilder: SelectQueryBuilder<T>,
  sortBy: string,
  sortOrder: 'ASC' | 'DESC' = 'ASC',
  allowedFields: string[],
): void {
  if (!sortBy || !allowedFields.includes(sortBy)) return;
  queryBuilder.orderBy(sortBy, sortOrder);
}

export function applyPagination<T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number = 1,
  limit: number = 10,
): void {
  const skip = (page - 1) * limit;
  queryBuilder.skip(skip).take(limit);
}

export function buildWhereClause(conditions: Record<string, any>): string {
  return Object.entries(conditions)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key} = :${key}`)
    .join(' AND ');
}