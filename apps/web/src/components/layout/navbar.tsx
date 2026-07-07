'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Boxes, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { ThemeToggle } from './theme-toggle';
import { MobileNav } from './mobile-nav';
import { navLinks } from './nav-links';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="glass glass-border sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Boxes className="h-5 w-5 text-primary" />
            <span className="text-base">AlgoVerse</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden gap-2 sm:flex" asChild>
            <Link href="/search">
              <Search className="h-4 w-4" />
              <span className="text-muted-foreground">Search algorithms…</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden" asChild>
            <Link href="/search" aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
