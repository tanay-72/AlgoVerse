'use client';

import { useSearchParams } from 'next/navigation';
import type { Difficulty } from '@algoverse/shared-types';
import { useAlgorithms } from '@/lib/query/use-algorithms';
import { AlgorithmList } from '@/components/algorithm/algorithm-list';
import { Pagination } from '@/components/shared/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, usePathname } from 'next/navigation';

const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];
const PAGE_SIZE = 12;

export function ExplorerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = searchParams.get('category') ?? undefined;
  const difficulty = (searchParams.get('difficulty') as Difficulty | null) ?? undefined;
  const page = Number(searchParams.get('page') ?? '1');

  const { data, isLoading } = useAlgorithms({ category, difficulty, page, pageSize: PAGE_SIZE });

  function updateDifficulty(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('difficulty');
    } else {
      params.set('difficulty', value);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Algorithm Explorer</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {data?.meta.total ?? '—'} algorithms{category ? ' in this category' : ''}
          </p>
        </div>

        <Select value={difficulty ?? 'all'} onValueChange={updateDifficulty}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All difficulties</SelectItem>
            {difficulties.map((d) => (
              <SelectItem key={d} value={d}>
                {d.charAt(0) + d.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AlgorithmList algorithms={data?.items} isLoading={isLoading} />

      {data && <Pagination page={data.meta.page} totalPages={data.meta.totalPages} />}
    </div>
  );
}
