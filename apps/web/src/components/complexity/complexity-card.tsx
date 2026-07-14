'use client';

import React, { useState } from 'react';
import type { ComplexityReference } from '@algoverse/shared-types';
import { cn } from '@/lib/utils/cn';

interface ComplexityCardProps {
  reference: ComplexityReference;
}

export function ComplexityCard({ reference }: { reference: ComplexityReference }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Full-screen backdrop blur overlay when hovered */}
      {isHovered && (
        <div className="fixed inset-0 bg-background/40 dark:bg-black/60 backdrop-blur-md z-30 pointer-events-none transition-all duration-300 animate-fade-in" />
      )}

      <div
        className="relative w-full group select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card popping out and focusing */}
        <div
          className={cn(
            "w-full rounded-xl border p-6 transition-all duration-300 ease-out origin-center flex flex-col gap-3",
            isHovered
              ? "scale-[1.12] z-40 shadow-2xl shadow-primary/20 border-primary bg-white dark:bg-zinc-950 text-foreground relative"
              : "glass-panel border-border/80 text-foreground"
          )}
        >
          <div className="flex items-baseline gap-3">
            <span className={cn(
              "font-mono text-xl font-bold transition-colors",
              isHovered ? "text-primary scale-105" : "text-primary/90"
            )}>
              {reference.notation}
            </span>
            <span className="text-sm font-semibold text-foreground/90">{reference.name}</span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {reference.description}
          </p>

          <p className="text-xs text-muted-foreground/80 border-t border-border/60 pt-2.5">
            <span className="font-semibold text-foreground/80">Example:</span> {reference.example}
          </p>
        </div>
      </div>
    </>
  );
}
