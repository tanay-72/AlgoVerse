import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { ApiErrorResponse } from '@algoverse/shared-types';

interface HttpExceptionBody {
  message?: string | string[];
  error?: string;
  code?: string;
}

/**
 * Normalizes every thrown error — HttpException or otherwise — into the
 * standard `{ success: false, error }` envelope, and logs 5xx failures.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const body: HttpExceptionBody | string =
      exception instanceof HttpException
        ? (exception.getResponse() as HttpExceptionBody | string)
        : {};

    const message = this.extractMessage(body, exception);
    const code =
      typeof body === 'object' && body.code ? body.code : this.codeForStatus(status);

    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code,
        message,
        details: typeof body === 'object' ? body.message : undefined,
      },
    };

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url} -> ${status}: ${message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    response.status(status).json(errorResponse);
  }

  private extractMessage(body: HttpExceptionBody | string, exception: unknown): string {
    if (typeof body === 'string') return body;
    if (Array.isArray(body.message)) return body.message.join(', ');
    if (body.message) return body.message;
    if (exception instanceof Error) return exception.message;
    return 'An unexpected error occurred';
  }

  private codeForStatus(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'UNPROCESSABLE_ENTITY';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }
}
