'use client';

import Link from 'next/link';
import { History } from 'lucide-react';
import { useRecentlyViewedStore } from '@/lib/stores/recently-viewed-store';
import { Card, CardContent } from '@/components/ui/card';

export function RecentlyViewedSection() {
  const entries = useRecentlyViewedStore((state) => state.entries);

  if (entries.length === 0) return null;

  return (
    <section className="container py-16">
      <div className="mb-6 flex items-center gap-2">
        <History className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold tracking-tight">Recently Viewed</h2>
      </div>

      <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2">
        {entries.map((entry) => (
          <Link
            key={entry.algorithmSlug}
            href={`/algorithms/${entry.algorithmSlug}`}
            className="min-w-[220px] shrink-0"
          >
            <Card className="transition-colors hover:border-primary/40">
              <CardContent className="p-4">
                <p className="text-sm font-medium">{entry.algorithmName}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(entry.viewedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
