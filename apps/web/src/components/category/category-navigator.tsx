'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import type { Category } from '@algoverse/shared-types';
import { getCategoryIcon } from '@/lib/utils/icon-map';
import { getCategoryColor } from '@/lib/utils/category-colors';
import { useAlgorithms } from '@/lib/query/use-algorithms';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

interface CategoryNavigatorProps {
  categories: Category[];
}

export function CategoryNavigator({ categories }: CategoryNavigatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = categories[activeIndex] || categories[0];

  // Fetch key algorithms for the active category
  const { data: algorithmsData, isLoading: isLoadingAlgos } = useAlgorithms({
    category: activeCategory?.slug,
    pageSize: 6,
  });

  const activeColor = activeCategory ? getCategoryColor(activeCategory.slug) : null;
  const ActiveIcon = activeCategory ? getCategoryIcon(activeCategory.icon) : Sparkles;

  // Prevent issues on empty category lists
  if (!activeCategory) return null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Left Column: Interactive Categories Sidebar */}
      <div className="flex flex-col gap-2 lg:col-span-1">
        {categories.map((category, idx) => {
          const Icon = getCategoryIcon(category.icon);
          const color = getCategoryColor(category.slug);
          const isActive = idx === activeIndex;

          return (
            <button
              key={category.slug}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              className={cn(
                "glass-panel flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-300",
                isActive
                  ? `border-primary bg-primary/5 text-foreground shadow-md shadow-primary/5 translate-x-1`
                  : "border-border/60 hover:bg-secondary/40 hover:border-border"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300",
                  isActive ? `${color.bg} ${color.text} scale-105` : "bg-secondary text-muted-foreground"
                )}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight">{category.name}</p>
                  <p className="text-[11px] text-muted-foreground">{category.algorithmCount ?? 0} algorithms</p>
                </div>
              </div>
              <ChevronRight className={cn(
                "h-4 w-4 text-muted-foreground/60 transition-transform duration-300",
                isActive ? "translate-x-1 text-primary" : "opacity-0"
              )} />
            </button>
          );
        })}
      </div>

      {/* Right Column: Dynamic Category Showcase Card */}
      <div className="relative lg:col-span-2">
        {/* Glow Orb specific to the category's theme color */}
        {activeColor && (
          <div className={cn(
            "absolute -top-12 -right-12 h-64 w-64 rounded-full filter blur-[80px] opacity-15 pointer-events-none transition-all duration-700",
            activeColor.bg.replace('/15', '/40') // Boost opacity for the showcase glow
          )} />
        )}

        <div className="glass-panel relative h-full rounded-2xl border border-border p-8 shadow-xl shadow-primary/5 flex flex-col justify-between min-h-[400px]">
          <div className="space-y-6">
            {/* Header: Category Icon & Title */}
            <div className="flex items-center gap-4">
              {activeColor && (
                <span className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-500",
                  activeColor.bg,
                  activeColor.text
                )}>
                  <ActiveIcon className="h-7 w-7 animate-pulse-slow" />
                </span>
              )}
              <div>
                <h3 className="text-2xl font-bold tracking-tight">{activeCategory.name}</h3>
                <p className="text-xs text-muted-foreground/80 font-mono">Category Overview</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm">
              {activeCategory.description}
            </p>

            {/* Key Algorithms Container */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                Key Algorithms in {activeCategory.name}
              </h4>
              
              {isLoadingAlgos ? (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-secondary/80" />
                  ))}
                </div>
              ) : algorithmsData?.items && algorithmsData.items.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {algorithmsData.items.map((algo) => (
                    <Link
                      key={algo.slug}
                      href={`/algorithms/${algo.slug}`}
                      className="inline-flex items-center rounded-full border border-border/80 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                    >
                      {algo.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">No algorithms listed under this category yet.</p>
              )}
            </div>
          </div>

          {/* Footer Action CTA */}
          <div className="pt-8 border-t border-border/40 mt-8 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Explore complex concepts made easy.
            </span>
            <Button className="group" asChild>
              <Link href={`/categories/${activeCategory.slug}`}>
                Explore all {activeCategory.name}
                <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
