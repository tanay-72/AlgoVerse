import { useEffect, useState } from 'react';

/**
 * Tracks scroll progress from 0 to 1 as the page scrolls through `distance`
 * pixels. Used to drive scroll-linked transforms (e.g. a shrinking hero).
 */
export function useScrollProgress(distance: number): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    function handleScroll() {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        setProgress(Math.min(1, Math.max(0, window.scrollY / distance)));
        frame = null;
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return progress;
}
