import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="h-8 w-8" />
      </span>
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">404</h1>
        <p className="mt-2 text-muted-foreground">
          This page wandered off the search path. Let&apos;s get you back on track.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Back Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/explorer">Explore Algorithms</Link>
        </Button>
      </div>
    </div>
  );
}
