'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollProgress } from '@/hooks/use-scroll-progress';

const SHRINK_DISTANCE = 400;

export function Hero() {
  const progress = useScrollProgress(SHRINK_DISTANCE);
  const scale = 1 - progress * 0.25;
  const opacity = 1 - progress * 0.6;
  const translateY = progress * -16;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

      <div className="container relative flex flex-col items-center gap-6 py-24 text-center sm:py-32">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          32 algorithms · 28 categories · 2 languages each
        </span>

        <h1
          className="max-w-3xl text-balance text-4xl font-semibold tracking-tight will-change-transform sm:text-5xl md:text-6xl"
          style={{
            transform: `scale(${scale}) translateY(${translateY}px)`,
            opacity,
          }}
        >
          Master Data Structures &amp; Algorithms,{' '}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            one concept at a time
          </span>
        </h1>

        <p className="max-w-xl text-balance text-muted-foreground sm:text-lg">
          Clean explanations, dry runs, complexity analysis, and dual-language implementations —
          built like a developer product, not a textbook.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/explorer">
              Start Exploring
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
