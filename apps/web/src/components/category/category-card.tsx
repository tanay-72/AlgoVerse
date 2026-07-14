'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Category } from '@algoverse/shared-types';
import { getCategoryIcon } from '@/lib/utils/icon-map';
import { getCategoryColor } from '@/lib/utils/category-colors';
import { useAlgorithms } from '@/lib/query/use-algorithms';
import { cn } from '@/lib/utils/cn';

export function CategoryCard({ category }: { category: Category }) {
  const Icon = getCategoryIcon(category.icon);
  const color = getCategoryColor(category.slug);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch key algorithms for the hover expansion panel
  const { data: algosData, isLoading } = useAlgorithms({
    category: category.slug,
    pageSize: 5,
  });

  return (
    <>
      {/* Full-screen backdrop blur overlay when hovered */}
      {isHovered && (
        <div className="fixed inset-0 bg-background/40 dark:bg-black/60 backdrop-blur-md z-30 pointer-events-none transition-all duration-300 animate-fade-in" />
      )}

      <div
        className="relative h-[180px] w-full group select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Inner expanding block that pops out, scales up, and overlays */}
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full border rounded-xl p-5 transition-all duration-300 ease-out origin-top flex flex-col justify-between overflow-hidden",
            isHovered
              ? "h-auto scale-[1.25] z-40 shadow-2xl shadow-primary/20 border-primary bg-white dark:bg-zinc-950 text-foreground"
              : "glass-panel border-border/80 text-foreground",
            !isHovered && color.border
          )}
        >
          <Link href={`/categories/${category.slug}`} className="block space-y-3">
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300",
                  color.bg,
                  color.text,
                  isHovered && "scale-110 shadow-md"
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground/80">
                {category.algorithmCount ?? 0} algorithms
              </span>
            </div>

            <div>
              <h3 className={cn("text-sm font-bold transition-colors text-foreground", color.groupHoverText)}>
                {category.name}
              </h3>
              <p className={cn("mt-1.5 text-xs text-muted-foreground leading-relaxed", !isHovered && "line-clamp-2")}>
                {category.description}
              </p>
            </div>
          </Link>

          {/* Expanding Content Panel containing dynamic algorithm tags */}
          <div
            className={cn(
              "max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out space-y-3",
              isHovered && "max-h-[160px] opacity-100 mt-4"
            )}
          >
            <div className="h-px bg-border/60" />
            
            <div className="space-y-1.5">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                Included Topics:
              </p>

              {isLoading ? (
                <div className="flex gap-1.5">
                  <div className="h-4 w-12 animate-pulse rounded bg-secondary" />
                  <div className="h-4 w-16 animate-pulse rounded bg-secondary" />
                </div>
              ) : algosData?.items && algosData.items.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {algosData.items.map((algo) => (
                    <Link
                      key={algo.slug}
                      href={`/algorithms/${algo.slug}`}
                      className="inline-flex items-center rounded bg-secondary/80 hover:bg-primary/10 hover:text-primary hover:border-primary/20 border border-transparent px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground transition-all duration-200"
                    >
                      {algo.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground italic">No topics loaded</p>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center text-[10px] font-bold text-primary hover:underline"
              >
                Explore category →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
