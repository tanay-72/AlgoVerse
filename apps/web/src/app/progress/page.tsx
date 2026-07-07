'use client';

import { Target } from 'lucide-react';
import { useProgressSummary } from '@/hooks/use-progress-summary';
import { ProgressSummaryTiles } from '@/components/progress/progress-summary';
import { CategoryProgressList } from '@/components/progress/category-progress-list';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProgressPage() {
  const { summary, isLoading } = useProgressSummary();

  return (
    <div className="container max-w-3xl py-10">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-semibold tracking-tight">Progress</h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Tracked locally in your browser as you mark algorithms complete.
      </p>

      {isLoading || !summary ? (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-8">
            <ProgressSummaryTiles summary={summary} />
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Progress by Category</h2>
            <CategoryProgressList categories={summary.byCategory} />
          </div>
        </>
      )}
    </div>
  );
}
