import { HttpException, HttpStatus } from '@nestjs/common';
export declare class ApiError extends HttpException {
    constructor(message: string, status: HttpStatus);
}
export declare function handleDatabaseError(error: any): never;
export declare function throwIfNotFound(resource: any, message: string): void;
export declare function throwIfUnauthorized(condition: boolean, message: string): void;
export declare function throwIfForbidden(condition: boolean, message: string): void;
