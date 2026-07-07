import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchCategoryBySlug } from '@/lib/api/categories';
import { queryKeys } from './keys';

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: queryKeys.categories.detail(slug),
    queryFn: () => fetchCategoryBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(slug),
  });
}
