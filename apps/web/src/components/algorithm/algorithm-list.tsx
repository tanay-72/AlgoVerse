import type { AlgorithmSummary } from '@algoverse/shared-types';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchX } from 'lucide-react';
import { AlgorithmCard } from './algorithm-card';

interface AlgorithmListProps {
  algorithms?: AlgorithmSummary[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function AlgorithmList({
  algorithms,
  isLoading,
  emptyMessage = 'No algorithms match these filters yet.',
}: AlgorithmListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-44 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!algorithms || algorithms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
        <SearchX className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {algorithms.map((algorithm) => (
        <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
      ))}
    </div>
  );
}
