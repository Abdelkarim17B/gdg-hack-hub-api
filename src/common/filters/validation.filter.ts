import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  private readonly logger = new Logger('Validation');

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    let validationErrors = [];

    if (Array.isArray(exceptionResponse.message)) {
      validationErrors = this.formatValidationErrors(exceptionResponse.message);
    } else {
      validationErrors = [exceptionResponse.message];
    }

    // Log validation errors at warn level
    this.logger.warn(`Validation failed: ${validationErrors.join(', ')}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: 'Validation failed',
      errors: validationErrors,
    });
  }

  private formatValidationErrors(errors: string[]): string[] {
    return errors.map(error => {
      // Clean up class-validator messages
      return error
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .trim();
    });
  }
}