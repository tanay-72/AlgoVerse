'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interpolate progress over 400px of scroll height
  const progress = typeof window !== 'undefined' ? Math.min(scrollY / 400, 1) : 0;
  const scale = 1 - progress * 0.22; // shrinks down to 0.78x
  const opacity = 1 - progress * 0.65; // fades down to 0.35 opacity
  const translateY = progress * -30; // floats upwards slightly

  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-32 sm:py-40 md:py-48 flex items-center justify-center">
      {/* Light-beams and Grid Overlays */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.12] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div className="light-beam left-[15%] top-0 h-full w-[1px]" />
      <div className="light-beam right-[15%] top-0 h-full w-[1px]" />

      {/* Decorative Orbs behind content */}
      <div className="glow-orb -top-24 left-1/4 h-[350px] w-[350px] bg-emerald-500/25 animate-pulse-slow" />
      <div className="glow-orb top-32 right-1/4 h-[300px] w-[300px] bg-teal-500/15 animate-pulse-slow [animation-delay:2s]" />

      {/* Animated Orbits in background center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <div className="h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px] rounded-full border border-dashed border-emerald-500/15 animate-spin-slow" />
        <div className="absolute h-[250px] w-[250px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px] rounded-full border border-solid border-teal-500/10 animate-spin-slow [animation-direction:reverse] [animation-duration:60s]" />
      </div>

      <div 
        className="container relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
          transformOrigin: 'center top',
        }}
      >
        {/* Badge Pill */}
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition-all">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
            32 algorithms · 28 categories · 2 languages each
          </span>
        </div>

        {/* Title */}
        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-none">
          Master Data Structures &amp; Algorithms,{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            one concept at a time
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg md:text-xl">
          Clean explanations, dry runs, complexity analysis, and dual-language implementations —
          built like a developer product, not a textbook.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button size="lg" className="group relative overflow-hidden shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/35" asChild>
            <Link href="/explorer">
              Start Exploring
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="group transition-all hover:bg-secondary/80" asChild>
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
