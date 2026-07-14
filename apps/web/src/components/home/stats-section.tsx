'use client';

import React from 'react';
import { BookOpen, Layers, Sparkles, Sigma } from 'lucide-react';
import { useCategories } from '@/lib/query/use-categories';
import { useAlgorithms } from '@/lib/query/use-algorithms';
import { useComplexityReferences } from '@/lib/query/use-complexities';

export function StatsSection() {
  const { data: categories } = useCategories();
  const { data: algorithms } = useAlgorithms({ pageSize: 1 });
  const { data: complexities } = useComplexityReferences();

  const stats = [
    { label: 'Algorithms', value: algorithms?.meta.total ?? '—', icon: BookOpen },
    { label: 'Categories', value: categories?.length ?? '—', icon: Layers },
    { label: 'Languages per Algorithm', value: 2, icon: Sparkles },
    { label: 'Complexity Guides', value: complexities?.length ?? '—', icon: Sigma },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/10 py-16">
      <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass-panel group relative flex flex-col items-center gap-3 rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-3xl font-extrabold tracking-tight tabular-nums transition-colors group-hover:text-primary">
                {stat.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
