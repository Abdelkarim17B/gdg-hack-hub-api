import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
export const maxFileSize = 5 * 1024 * 1024; // 5MB

export function validateFileExtension(filename: string, allowedExtensions: string[]): void {
  const ext = extname(filename).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    throw new BadRequestException(
      `Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`
    );
  }
}

export function validateFileSize(size: number, maxSize: number): void {
  if (size > maxSize) {
    throw new BadRequestException(
      `File size exceeds the limit. Maximum allowed size: ${maxSize / 1024 / 1024}MB`
    );
  }
}

export function generateUniqueFilename(originalname: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const ext = extname(originalname);
  return `${timestamp}-${randomString}${ext}`;
}

export function getFileType(filename: string): string {
  const ext = extname(filename).toLowerCase();
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const documentExtensions = ['.pdf', '.doc', '.docx'];
  
  if (imageExtensions.includes(ext)) return 'image';
  if (documentExtensions.includes(ext)) return 'document';
  return 'other';
}