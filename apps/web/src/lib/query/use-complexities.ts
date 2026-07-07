import { useQuery } from '@tanstack/react-query';
import { fetchComplexityReferences } from '@/lib/api/complexities';
import { queryKeys } from './keys';

export function useComplexityReferences() {
  return useQuery({
    queryKey: queryKeys.complexities.all,
    queryFn: fetchComplexityReferences,
    staleTime: 30 * 60 * 1000,
  });
}
