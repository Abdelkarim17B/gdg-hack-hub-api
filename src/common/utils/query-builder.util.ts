import { SelectQueryBuilder } from 'typeorm';

export class QueryBuilderHelper<T> {
  constructor(private queryBuilder: SelectQueryBuilder<T>) {}

  addWhereClause(field: string, value: any): this {
    if (value !== undefined) {
      this.queryBuilder.andWhere(`${field} = :${field}`, { [field]: value });
    }
    return this;
  }

  addInClause(field: string, values: any[]): this {
    if (values?.length) {
      this.queryBuilder.andWhere(`${field} IN (:...${field})`, { [field]: values });
    }
    return this;
  }

  addLikeClause(field: string, value: string): this {
    if (value) {
      this.queryBuilder.andWhere(`${field} ILIKE :${field}`, { [field]: `%${value}%` });
    }
    return this;
  }

  addDateRangeClause(field: string, startDate?: Date, endDate?: Date): this {
    if (startDate) {
      this.queryBuilder.andWhere(`${field} >= :${field}Start`, { [`${field}Start`]: startDate });
    }
    if (endDate) {
      this.queryBuilder.andWhere(`${field} <= :${field}End`, { [`${field}End`]: endDate });
    }
    return this;
  }

  addOrderClause(field: string, order: 'ASC' | 'DESC' = 'ASC', allowedFields: string[] = []): this {
    if (field && allowedFields.includes(field)) {
      this.queryBuilder.orderBy(field, order);
    }
    return this;
  }

  addRelations(relations: string[]): this {
    relations.forEach(relation => {
      this.queryBuilder.leftJoinAndSelect(`${this.queryBuilder.alias}.${relation}`, relation);
    });
    return this;
  }

  addPagination(page: number = 1, limit: number = 10): this {
    const skip = (page - 1) * limit;
    this.queryBuilder.skip(skip).take(limit);
    return this;
  }

  getQueryBuilder(): SelectQueryBuilder<T> {
    return this.queryBuilder;
  }
}