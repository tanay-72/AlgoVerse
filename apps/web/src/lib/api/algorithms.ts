import type { Algorithm, AlgorithmSummary, Difficulty, PaginatedData } from '@algoverse/shared-types';
import { apiFetch, buildQueryString, type FetchResult } from './client';

export interface AlgorithmsQuery {
  page?: number;
  pageSize?: number;
  category?: string;
  difficulty?: Difficulty;
  tag?: string;
}

export async function fetchAlgorithms(
  query: AlgorithmsQuery = {},
): Promise<PaginatedData<AlgorithmSummary>> {
  const qs = buildQueryString({
    page: query.page,
    pageSize: query.pageSize,
    category: query.category,
    difficulty: query.difficulty,
    tag: query.tag,
  });

  const result: FetchResult<AlgorithmSummary[]> = await apiFetch<AlgorithmSummary[]>(
    `/algorithms${qs}`,
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

export async function fetchAlgorithmBySlug(slug: string): Promise<Algorithm> {
  const result = await apiFetch<Algorithm>(`/algorithms/${slug}`);
  return result.data;
}
