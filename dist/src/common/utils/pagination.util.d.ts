import { SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}
export declare function paginate<T>(queryBuilder: SelectQueryBuilder<T>, paginationDto: PaginationDto): Promise<PaginatedResult<T>>;
