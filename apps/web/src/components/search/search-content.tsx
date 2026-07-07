'use client';

import { useSearchParams } from 'next/navigation';
import type { Difficulty } from '@algoverse/shared-types';
import { useSearch } from '@/lib/query/use-search';
import { AlgorithmList } from '@/components/algorithm/algorithm-list';
import { Pagination } from '@/components/shared/pagination';
import { SearchBar } from './search-bar';
import { SearchFilters } from './search-filters';

const PAGE_SIZE = 12;

export function SearchContent() {
  const searchParams = useSearchParams();

  const q = searchParams.get('q') ?? undefined;
  const category = searchParams.get('category') ?? undefined;
  const difficulty = (searchParams.get('difficulty') as Difficulty | null) ?? undefined;
  const complexity = searchParams.get('complexity') ?? undefined;
  const page = Number(searchParams.get('page') ?? '1');

  const hasQuery = Boolean(q || category || difficulty || complexity);
  const { data, isLoading } = useSearch({
    q,
    category,
    difficulty,
    complexity,
    page,
    pageSize: PAGE_SIZE,
  });

  return (
    <div className="flex flex-col gap-6">
      <SearchBar />
      <SearchFilters />

      {hasQuery ? (
        <>
          <p className="text-sm text-muted-foreground">
            {isLoading ? 'Searching…' : `${data?.meta.total ?? 0} results`}
          </p>
          <AlgorithmList algorithms={data?.items} isLoading={isLoading} />
          {data && <Pagination page={data.meta.page} totalPages={data.meta.totalPages} />}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-sm text-muted-foreground">
            Search by algorithm name, tag, or topic — or apply a filter to browse.
          </p>
        </div>
      )}
    </div>
  );
}
