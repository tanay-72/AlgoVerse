'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { AlgorithmSummary } from '@algoverse/shared-types';
import { Badge } from '@/components/ui/badge';
import { getCategoryIcon } from '@/lib/utils/icon-map';
import { getCategoryColor } from '@/lib/utils/category-colors';
import { DifficultyBadge } from './difficulty-badge';
import { cn } from '@/lib/utils/cn';

export function AlgorithmCard({ algorithm }: { algorithm: AlgorithmSummary }) {
  const Icon = getCategoryIcon(algorithm.category.icon);
  const color = getCategoryColor(algorithm.category.slug);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Full-screen backdrop blur overlay when hovered */}
      {isHovered && (
        <div className="fixed inset-0 bg-background/40 dark:bg-black/60 backdrop-blur-md z-30 pointer-events-none transition-all duration-300 animate-fade-in" />
      )}

      <div
        className="relative h-[200px] w-full select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card popping out and focusing */}
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full border rounded-xl p-5 transition-all duration-300 ease-out origin-center flex flex-col justify-between overflow-hidden",
            isHovered
              ? "h-auto scale-[1.20] z-40 shadow-2xl shadow-primary/20 border-primary bg-white dark:bg-zinc-950 text-foreground"
              : "glass-panel border-border/80 text-foreground",
            !isHovered && color.border
          )}
        >
          <Link href={`/algorithms/${algorithm.slug}`} className="block space-y-3">
            <div className="flex items-center justify-between">
              <span className={cn("flex items-center gap-1.5 text-xs font-semibold", color.text)}>
                <Icon className="h-3.5 w-3.5" />
                {algorithm.category.name}
              </span>
              <DifficultyBadge difficulty={algorithm.difficulty} />
            </div>

            <div>
              <h3 className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {algorithm.name}
              </h3>
              <p className={cn("mt-1.5 text-xs text-muted-foreground leading-relaxed", !isHovered && "line-clamp-2")}>
                {algorithm.summary}
              </p>
            </div>
          </Link>

          {/* Time Complexity & Tags at the bottom */}
          <div className="flex flex-col gap-3 pt-2.5">
            {isHovered && <div className="h-px bg-border/60" />}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="font-mono text-[10px]">
                {algorithm.timeComplexityAverage}
              </Badge>
              {algorithm.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
