'use client';

import { BookOpen, Layers, Sparkles, Trophy } from 'lucide-react';
import { useCategories } from '@/lib/query/use-categories';
import { useAlgorithms } from '@/lib/query/use-algorithms';

export function StatsSection() {
  const { data: categories } = useCategories();
  const { data: algorithms } = useAlgorithms({ pageSize: 1 });

  const stats = [
    { label: 'Algorithms', value: algorithms?.meta.total ?? '—', icon: BookOpen },
    { label: 'Categories', value: categories?.length ?? '—', icon: Layers },
    { label: 'Languages per Algorithm', value: 2, icon: Sparkles },
    { label: 'Sign-ups Required', value: 0, icon: Trophy },
  ];

  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <stat.icon className="h-5 w-5 text-primary" />
            <span className="text-2xl font-semibold tabular-nums">{stat.value}</span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
