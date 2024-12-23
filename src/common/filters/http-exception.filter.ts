import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpException');

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = 
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Format the error response
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: this.formatErrorMessage(message),
    };

    // Log based on error type
    this.logError(status, request, exception);

    response.status(status).json(errorResponse);
  }

  private formatErrorMessage(message: any): string {
    if (typeof message === 'string') {
      return message;
    }
    if (typeof message === 'object' && message.message) {
      return Array.isArray(message.message) 
        ? message.message[0]
        : message.message;
    }
    return 'An error occurred';
  }

  private logError(status: number, request: Request, exception: Error): void {
    const errorLevel = this.getErrorLevel(status);
    const message = `${request.method} ${request.url}`;

    switch (errorLevel) {
      case 'ERROR':
        this.logger.error(message, exception.stack);
        break;
      case 'WARN':
        this.logger.warn(`${message} - ${exception.message}`);
        break;
      case 'DEBUG':
        this.logger.debug(`${message} - ${exception.message}`);
        break;
      default:
        this.logger.log(`${message} - ${exception.message}`);
    }
  }

  private getErrorLevel(status: number): string {
    if (status >= 500) {
      return 'ERROR';
    }
    if (status >= 400) {
      return 'WARN';
    }
    return 'DEBUG';
  }
}