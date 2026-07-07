import type { AlgorithmSummary, Difficulty, PaginatedData } from '@algoverse/shared-types';
import { apiFetch, buildQueryString, type FetchResult } from './client';

export interface SearchQuery {
  q?: string;
  category?: string;
  difficulty?: Difficulty;
  tag?: string;
  complexity?: string;
  page?: number;
  pageSize?: number;
}

export async function searchAlgorithms(
  query: SearchQuery,
): Promise<PaginatedData<AlgorithmSummary>> {
  const qs = buildQueryString({
    q: query.q,
    category: query.category,
    difficulty: query.difficulty,
    tag: query.tag,
    complexity: query.complexity,
    page: query.page,
    pageSize: query.pageSize,
  });

  const result: FetchResult<AlgorithmSummary[]> = await apiFetch<AlgorithmSummary[]>(
    `/search${qs}`,
  );

  return {
    items: result.data,
    meta: {
      page: result.meta?.page ?? 1,
      pageSize: result.meta?.pageSize ?? result.data.length,
      total: result.meta?.total ?? result.data.length,
      totalPages: result.meta?.totalPages ?? 1,
    },
  };
}
