import type { AlgorithmsQuery } from '@/lib/api/algorithms';
import type { SearchQuery } from '@/lib/api/search';

export const queryKeys = {
  categories: {
    all: ['categories'] as const,
    detail: (slug: string) => ['categories', slug] as const,
  },
  algorithms: {
    all: ['algorithms'] as const,
    list: (query: AlgorithmsQuery) => ['algorithms', 'list', query] as const,
    detail: (slug: string) => ['algorithms', slug] as const,
  },
  complexities: {
    all: ['complexities'] as const,
  },
  search: {
    query: (query: SearchQuery) => ['search', query] as const,
  },
};
