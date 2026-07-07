import Link from 'next/link';
import type { Category } from '@algoverse/shared-types';
import { Card, CardContent } from '@/components/ui/card';
import { getCategoryIcon } from '@/lib/utils/icon-map';

export function CategoryCard({ category }: { category: Category }) {
  const Icon = getCategoryIcon(category.icon);

  return (
    <Link href={`/categories/${category.slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {category.algorithmCount ?? 0} algorithms
            </span>
          </div>
          <div>
            <h3 className="font-semibold group-hover:text-primary">{category.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
