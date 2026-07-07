import { useQuery } from '@tanstack/react-query';
import { searchAlgorithms, type SearchQuery } from '@/lib/api/search';
import { queryKeys } from './keys';

export function useSearch(query: SearchQuery) {
  return useQuery({
    queryKey: queryKeys.search.query(query),
    queryFn: () => searchAlgorithms(query),
    staleTime: 60 * 1000,
    enabled: Boolean(query.q || query.category || query.difficulty || query.tag || query.complexity),
  });
}
