import type { Difficulty } from './enums';

/**
 * Envelope returned by every AlgoVerse API endpoint so the client can rely on
 * a single, predictable response shape regardless of the resource.
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: ResponseMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ResponseMeta {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
}

export interface PaginatedData<T> {
  items: T[];
  meta: Required<Pick<ResponseMeta, 'page' | 'pageSize' | 'total' | 'totalPages'>>;
}

export interface SearchAlgorithmsQuery {
  q?: string;
  category?: string;
  difficulty?: Difficulty;
  tag?: string;
  complexity?: string;
  page?: number;
  pageSize?: number;
}
