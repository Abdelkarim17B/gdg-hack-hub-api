import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}

export function handleDatabaseError(error: any): never {
  if (error.code === '23505') { // Unique violation
    throw new ApiError('Resource already exists', HttpStatus.CONFLICT);
  }
  
  if (error.code === '23503') { // Foreign key violation
    throw new ApiError('Referenced resource not found', HttpStatus.BAD_REQUEST);
  }
  
  throw new ApiError('Database error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
}

export function throwIfNotFound(resource: any, message: string): void {
  if (!resource) {
    throw new ApiError(message, HttpStatus.NOT_FOUND);
  }
}

export function throwIfUnauthorized(condition: boolean, message: string): void {
  if (condition) {
    throw new ApiError(message, HttpStatus.UNAUTHORIZED);
  }
}

export function throwIfForbidden(condition: boolean, message: string): void {
  if (condition) {
    throw new ApiError(message, HttpStatus.FORBIDDEN);
  }
}