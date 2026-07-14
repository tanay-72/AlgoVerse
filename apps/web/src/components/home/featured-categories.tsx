'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '@/lib/query/use-categories';
import { CategoryNavigator } from '@/components/category/category-navigator';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export function FeaturedCategories() {
  const { data: categories, isLoading } = useCategories();

  return (
    <section className="container py-16 animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Explore Categories</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Interact with trees, graphs, sorting arrays, and complexity sheets.
          </p>
        </div>
        <Button variant="ghost" asChild className="hidden sm:flex transition-all hover:bg-secondary">
          <Link href="/categories">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-2 lg:col-span-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
          <Skeleton className="lg:col-span-2 h-[350px] rounded-2xl" />
        </div>
      ) : (
        <CategoryNavigator categories={(categories ?? []).slice(0, 6)} />
      )}
    </section>
  );
}
