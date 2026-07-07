'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '@/lib/query/use-categories';
import { CategoryGrid } from '@/components/category/category-grid';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export function FeaturedCategories() {
  const { data: categories, isLoading } = useCategories();

  return (
    <section className="container py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Browse by Category</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            From arrays to segment trees — every core DSA topic, organized.
          </p>
        </div>
        <Button variant="ghost" asChild className="hidden sm:flex">
          <Link href="/categories">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      ) : (
        <CategoryGrid categories={(categories ?? []).slice(0, 8)} />
      )}
    </section>
  );
}
