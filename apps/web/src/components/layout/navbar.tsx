'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Boxes, Search, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { ThemeToggle } from './theme-toggle';
import { MobileNav } from './mobile-nav';
import { navLinks } from './nav-links';
import { useBookmarksStore } from '@/lib/stores/bookmarks-store';

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const bookmarks = useBookmarksStore((state) => state.bookmarks);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bookmarkCount = mounted ? bookmarks.length : 0;

  return (
    <header className="glass glass-border sticky top-0 z-40 w-full border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight transition-transform hover:scale-[1.03]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary animate-pulse-slow"
            >
              <circle cx="12" cy="5" r="2.5" className="fill-primary" />
              <circle cx="5" cy="18" r="2.5" className="fill-primary" />
              <circle cx="19" cy="18" r="2.5" className="fill-primary" />
              <line x1="12" y1="7.5" x2="6.5" y2="15.5" />
              <line x1="12" y1="7.5" x2="17.5" y2="15.5" />
              <line x1="7.5" y1="18" x2="16.5" y2="18" />
            </svg>
            <span className="text-base font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">AlgoVerse</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              const isBookmarks = link.label === 'Bookmarks';
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground',
                    isActive ? 'text-foreground font-semibold bg-secondary/80' : 'text-muted-foreground',
                  )}
                >
                  {link.label}
                  {isBookmarks && bookmarkCount > 0 && (
                    <span className="ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                      {bookmarkCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" className="hidden gap-2 sm:flex transition-all hover:border-primary/30 hover:bg-primary/5" asChild>
            <Link href="/search">
              <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
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
