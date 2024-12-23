import { ApiResponseDto } from '../dto/api-response.dto';

export function createApiResponse<T>(data: T, path: string): ApiResponseDto<T> {
  return {
    data,
    timestamp: new Date().toISOString(),
    path,
  };
}

export function createPaginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
} {
  return {
    items,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
}

export function createErrorResponse(
  message: string,
  statusCode: number,
  path: string,
): {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
} {
  return {
    statusCode,
    message,
    timestamp: new Date().toISOString(),
    path,
  };
}

export function createSuccessResponse(
  message: string,
  path: string,
): {
  success: boolean;
  message: string;
  timestamp: string;
  path: string;
} {
  return {
    success: true,
    message,
    timestamp: new Date().toISOString(),
    path,
  };
}