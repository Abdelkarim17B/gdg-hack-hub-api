// Authentication and Security
export {
  hashPassword,
  comparePasswords,
} from './crypto.util';

export {
  generateSecureToken,
  sanitizeHtml,
  validatePassword,
  generateRandomPassword,
} from './security.util';

// Database and Query Handling
export {
  paginate,
  findOneOrFail,
  buildWhereClause,
  buildOrderClause,
  applySearchFilter,
  applyDateFilter,
  type PaginatedResult,
} from './database.util';

export {
  QueryBuilderHelper,
} from './query-builder.util';

export {
  applySearch,
  applySorting,
  applyPagination,
} from './query.util';

// Error Handling
export {
  ApiError,
  handleDatabaseError,
  throwIfNotFound,
  throwIfUnauthorized,
  throwIfForbidden,
} from './error.util';

// File Handling
export {
  validateFileExtension,
  validateFileSize,
  generateUniqueFilename,
  getFileType,
  allowedImageExtensions,
  maxFileSize,
} from './file.util';

// Response Formatting
export {
  createApiResponse,
  createPaginatedResponse,
  createErrorResponse,
  createSuccessResponse,
} from './response.util';

// String Manipulation
export {
  slugify,
  truncate,
  capitalizeFirstLetter,
  generateRandomString,
  isValidEmail,
} from './string.util';

// Date Handling
export {
  isValidDateRange,
  isDateInPast,
  formatDate,
  addDays,
} from './date.util';

// Validation
export {
  validateUUID,
  validateDateRange,
  validateScoreRange,
  validateEmail,
  validateRequired,
  validateLength,
  validateNumericRange,
  validateArrayLength,
} from './validation.util';