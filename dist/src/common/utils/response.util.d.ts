import { ApiResponseDto } from '../dto/api-response.dto';
export declare function createApiResponse<T>(data: T, path: string): ApiResponseDto<T>;
export declare function createPaginatedResponse<T>(items: T[], total: number, page: number, limit: number): {
    items: T[];
    total: number;
    page: number;
    limit: number;
    pages: number;
};
export declare function createErrorResponse(message: string, statusCode: number, path: string): {
    statusCode: number;
    message: string;
    timestamp: string;
    path: string;
};
export declare function createSuccessResponse(message: string, path: string): {
    success: boolean;
    message: string;
    timestamp: string;
    path: string;
};
