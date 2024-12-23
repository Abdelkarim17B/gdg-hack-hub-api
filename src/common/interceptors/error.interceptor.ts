import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger('ErrorInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const status = error.status || 500;

        // Log the error with appropriate level
        if (status >= 500) {
          this.logger.error(
            `Internal Server Error for ${request.method} ${request.url}`,
            error.stack,
          );
        } else if (status >= 400) {
          this.logger.warn(
            `Client Error (${status}) for ${request.method} ${request.url}: ${error.message}`,
          );
        } else {
          this.logger.debug(
            `Request Error for ${request.method} ${request.url}: ${error.message}`,
          );
        }

        return throwError(() => error);
      }),
    );
  }
}