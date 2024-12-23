import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  paginationDto: PaginationDto,
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10 } = paginationDto;
  const skip = (page - 1) * limit;

  queryBuilder.skip(skip).take(limit);

  const [items, total] = await queryBuilder.getManyAndCount();

  return {
    items,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
}