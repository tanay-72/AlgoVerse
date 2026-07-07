import { useMemo } from 'react';
import type { CategoryProgress, ProgressSummary } from '@algoverse/shared-types';
import { useCategories } from '@/lib/query/use-categories';
import { useProgressStore } from '@/lib/stores/progress-store';

export function useProgressSummary(): { summary: ProgressSummary | null; isLoading: boolean } {
  const completed = useProgressStore((state) => state.completed);
  const { data: categories, isLoading } = useCategories();

  const summary = useMemo<ProgressSummary | null>(() => {
    if (!categories) return null;

    const totalCount = categories.reduce(
      (sum, category) => sum + (category.algorithmCount ?? 0),
      0,
    );
    const completedCount = completed.length;

    const byCategory: CategoryProgress[] = categories.map((category) => {
      const categoryCompleted = completed.filter(
        (entry) => entry.categorySlug === category.slug,
      ).length;
      const total = category.algorithmCount ?? 0;

      return {
        categorySlug: category.slug,
        categoryName: category.name,
        completed: categoryCompleted,
        total,
        percentage: total > 0 ? Math.round((categoryCompleted / total) * 100) : 0,
      };
    });

    return {
      completedCount,
      remainingCount: Math.max(0, totalCount - completedCount),
      totalCount,
      completionPercentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
      byCategory,
    };
  }, [categories, completed]);

  return { summary, isLoading };
}
