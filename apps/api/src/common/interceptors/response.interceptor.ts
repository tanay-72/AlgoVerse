import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { ApiSuccessResponse, ResponseMeta } from '@algoverse/shared-types';

export interface Paginated<T> {
  items: T[];
  meta: ResponseMeta;
}

function isPaginated<T>(value: unknown): value is Paginated<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'items' in value &&
    'meta' in value &&
    Array.isArray((value as { items: unknown }).items)
  );
}

/**
 * Wraps every successful controller return value in the standard
 * `{ success, data, meta }` envelope so clients never have to branch on
 * per-endpoint response shapes.
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiSuccessResponse<T>> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiSuccessResponse<T>> {
    return next.handle().pipe(
      map((result) => {
        if (isPaginated<T>(result)) {
          return {
            success: true as const,
            data: result.items as unknown as T,
            meta: result.meta,
          };
        }

        return { success: true as const, data: result };
      }),
    );
  }
}
