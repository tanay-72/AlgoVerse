import type { CategoryProgress } from '@algoverse/shared-types';
import { Progress } from '@/components/ui/progress';

export function CategoryProgressList({ categories }: { categories: CategoryProgress[] }) {
  const withAlgorithms = categories.filter((category) => category.total > 0);

  return (
    <div className="flex flex-col gap-4">
      {withAlgorithms.map((category) => (
        <div key={category.categorySlug}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium">{category.categoryName}</span>
            <span className="text-muted-foreground">
              {category.completed}/{category.total}
            </span>
          </div>
          <Progress value={category.percentage} />
        </div>
      ))}
    </div>
  );
}
