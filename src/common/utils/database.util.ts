import { Repository, SelectQueryBuilder } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export async function initializeDatabase(repositories: Repository<any>[]): Promise<void> {
  if (!repositories.length) {
    throw new Error('No repositories provided for initialization');
  }

  const queryRunner = repositories[0].manager.connection.createQueryRunner();

  try {
    await queryRunner.connect();
    
    // Configure SQLite pragmas outside transaction
    await queryRunner.query('PRAGMA journal_mode = WAL');
    await queryRunner.query('PRAGMA busy_timeout = 20000');
    await queryRunner.query('PRAGMA synchronous = NORMAL');
    await queryRunner.query('PRAGMA foreign_keys = ON');
    
    // Start transaction for schema sync
    await queryRunner.startTransaction();
    
    try {
      // Sync schema within transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  } catch (error) {
    throw new Error(`Failed to initialize database: ${error.message}`);
  } finally {
    await queryRunner.release();
  }
}

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  { page = 1, limit = 10 }: PaginationDto
): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * limit;
  const [items, total] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  return {
    items,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
}

export async function findOneOrFail<T>(
  repository: Repository<T>,
  id: string,
  relations: string[] = []
): Promise<T> {
  const entity = await repository.findOne({
    where: { id } as any,
    relations,
  });

  if (!entity) {
    throw new BadRequestException(`Entity with ID ${id} not found`);
  }

  return entity;
}

export function buildWhereClause(conditions: Record<string, any>): string {
  return Object.entries(conditions)
    .filter(([_, value]) => value !== undefined)
    .map(([key]) => `${key} = :${key}`)
    .join(' AND ');
}

export function buildOrderClause(
  sortBy?: string,
  sortOrder: 'ASC' | 'DESC' = 'ASC',
  allowedFields: string[] = []
): string | undefined {
  if (!sortBy || !allowedFields.includes(sortBy)) {
    return undefined;
  }
  return `${sortBy} ${sortOrder}`;
}

export function applySearchFilter<T>(
  queryBuilder: SelectQueryBuilder<T>,
  searchTerm: string,
  searchFields: string[]
): void {
  if (!searchTerm || !searchFields.length) return;

  const conditions = searchFields.map(field => `${field} LIKE :searchTerm`);
  queryBuilder.andWhere(`(${conditions.join(' OR ')})`, {
    searchTerm: `%${searchTerm}%`,
  });
}

export function applyDateFilter<T>(
  queryBuilder: SelectQueryBuilder<T>,
  dateField: string,
  startDate?: Date,
  endDate?: Date
): void {
  if (startDate) {
    queryBuilder.andWhere(`${dateField} >= :startDate`, { startDate });
  }
  if (endDate) {
    queryBuilder.andWhere(`${dateField} <= :endDate`, { endDate });
  }
}