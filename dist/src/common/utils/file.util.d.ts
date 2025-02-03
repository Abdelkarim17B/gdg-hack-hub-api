export declare const allowedImageExtensions: string[];
export declare const maxFileSize: number;
export declare function validateFileExtension(filename: string, allowedExtensions: string[]): void;
export declare function validateFileSize(size: number, maxSize: number): void;
export declare function generateUniqueFilename(originalname: string): string;
export declare function getFileType(filename: string): string;
