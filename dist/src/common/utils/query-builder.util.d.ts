import { SelectQueryBuilder } from 'typeorm';
export declare class QueryBuilderHelper<T> {
    private queryBuilder;
    constructor(queryBuilder: SelectQueryBuilder<T>);
    addWhereClause(field: string, value: any): this;
    addInClause(field: string, values: any[]): this;
    addLikeClause(field: string, value: string): this;
    addDateRangeClause(field: string, startDate?: Date, endDate?: Date): this;
    addOrderClause(field: string, order?: 'ASC' | 'DESC', allowedFields?: string[]): this;
    addRelations(relations: string[]): this;
    addPagination(page?: number, limit?: number): this;
    getQueryBuilder(): SelectQueryBuilder<T>;
}
