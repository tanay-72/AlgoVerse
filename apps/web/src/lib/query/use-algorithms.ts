import { useQuery } from '@tanstack/react-query';
import { fetchAlgorithms, fetchAlgorithmBySlug, type AlgorithmsQuery } from '@/lib/api/algorithms';
import { queryKeys } from './keys';

export function useAlgorithms(query: AlgorithmsQuery = {}) {
  return useQuery({
    queryKey: queryKeys.algorithms.list(query),
    queryFn: () => fetchAlgorithms(query),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAlgorithm(slug: string) {
  return useQuery({
    queryKey: queryKeys.algorithms.detail(slug),
    queryFn: () => fetchAlgorithmBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(slug),
  });
}
