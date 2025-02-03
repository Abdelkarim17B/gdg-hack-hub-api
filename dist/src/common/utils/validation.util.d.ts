export declare function validateUUID(id: string): void;
export declare function validateDateRange(startDate: Date, endDate: Date): void;
export declare function validateScoreRange(score: number, min?: number, max?: number): void;
export declare function validateEmail(email: string): boolean;
export declare function validatePassword(password: string): void;
export declare function validateRequired(value: any, fieldName: string): void;
export declare function validateLength(value: string, fieldName: string, min: number, max: number): void;
export declare function validateNumericRange(value: number, fieldName: string, min: number, max: number): void;
export declare function validateArrayLength(array: any[], fieldName: string, min: number, max: number): void;
