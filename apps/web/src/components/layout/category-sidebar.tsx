'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCategories } from '@/lib/query/use-categories';
import { getCategoryIcon } from '@/lib/utils/icon-map';
import { cn } from '@/lib/utils/cn';
import { Skeleton } from '@/components/ui/skeleton';

export function CategorySidebar() {
  const { data: categories, isLoading } = useCategories();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  function hrefFor(slug: string | null): string {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    params.delete('page');
    const query = params.toString();
    return query ? `/explorer?${query}` : '/explorer';
  }

  return (
    <aside className="scrollbar-thin sticky top-24 hidden max-h-[calc(100vh-7rem)] w-64 shrink-0 overflow-y-auto pr-2 lg:block">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Categories
      </p>
      <nav className="flex flex-col gap-0.5">
        <Link
          href={hrefFor(null)}
          className={cn(
            'rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
            !activeCategory ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
          )}
        >
          All Categories
        </Link>

        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="mx-2 my-0.5 h-7 rounded-md" />
          ))}

        {categories?.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          const isActive = activeCategory === category.slug;

          return (
            <Link
              key={category.slug}
              href={hrefFor(category.slug)}
              className={cn(
                'flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
              )}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground">{category.algorithmCount}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
