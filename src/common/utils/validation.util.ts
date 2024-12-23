import { BadRequestException } from '@nestjs/common';

// UUID validation
export function validateUUID(id: string): void {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    throw new BadRequestException('Invalid UUID format');
  }
}

// Date validation
export function validateDateRange(startDate: Date, endDate: Date): void {
  if (startDate >= endDate) {
    throw new BadRequestException('Start date must be before end date');
  }
}

// Score validation
export function validateScoreRange(score: number, min = 0, max = 100): void {
  if (score < min || score > max) {
    throw new BadRequestException(`Score must be between ${min} and ${max}`);
  }
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation
export function validatePassword(password: string): void {
  if (password.length < 8) {
    throw new BadRequestException('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    throw new BadRequestException('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    throw new BadRequestException('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    throw new BadRequestException('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new BadRequestException('Password must contain at least one special character');
  }
}

// Input validation
export function validateRequired(value: any, fieldName: string): void {
  if (value === undefined || value === null || value === '') {
    throw new BadRequestException(`${fieldName} is required`);
  }
}

export function validateLength(value: string, fieldName: string, min: number, max: number): void {
  if (value.length < min || value.length > max) {
    throw new BadRequestException(`${fieldName} must be between ${min} and ${max} characters`);
  }
}

export function validateNumericRange(value: number, fieldName: string, min: number, max: number): void {
  if (value < min || value > max) {
    throw new BadRequestException(`${fieldName} must be between ${min} and ${max}`);
  }
}

export function validateArrayLength(array: any[], fieldName: string, min: number, max: number): void {
  if (array.length < min || array.length > max) {
    throw new BadRequestException(`${fieldName} must have between ${min} and ${max} items`);
  }
}